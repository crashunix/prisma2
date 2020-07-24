import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();


module.exports = {
    async index(req, res) {
        const posts = await prisma.post.findMany({
            include: {
                author: true
            }
        });
        return res.json(posts);
    },
    async show(req, res) {
        const post = await prisma.post.findOne({
            where: {id: parseInt(req.params.id)},
            include: {
                author: true
            }
        });
        return res.json(post);
    },
    async store(req, res) {
        const user = await prisma.user.update({
            where: {id: parseInt(req.body.authorId)},
            data: {
                posts: {
                    create: [
                        {
                            text: req.body.text,
                            midia: req.body.midia
                        }
                    ]
                }
            },
            include: {
                posts: true
            }
        })
        return res.json({
            msg: 'Post criado com sucesso para o usuário ' + user.name,
            posts: user.posts
        });
    },
    async update(req, res) {
        const post = await prisma.post.update({
            where: {id: parseInt(req.params.id)},
            data: req.body
        });
        return res.json({
            msg: 'Post alterado com sucesso',
            post: post
        });
    },
    async delete(req, res) {
        await prisma.post.delete({
            where: {id: parseInt(req.params.id)}
        }).then();
        return res.json({
            msg: 'Post excluido com sucesso',
        });
    }
}