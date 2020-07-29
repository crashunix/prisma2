import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();


module.exports = {
    async index(req, res) {
        const posts = await prisma.post.findMany({
            include: {
                author: true
            }
        });
        if(posts) {
            return res.status(200).json(posts);
        } else {
            return res.status(500).json({
                msg: 'Não há posts'
            });
        }
    },
    async show(req, res) {
        const post = await prisma.post.findOne({
            where: {id: parseInt(req.params.id)},
            include: {
                author: true
            }
        });
        if(post) {
            return res.status(200).json(post);
        } else {
            return res.status(500).json({msg: 'Post inexistente'});
        }
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
        if(user) {
            return res.status(200).json({
                msg: 'Post criado com sucesso para o usuário ' + user.name,
                posts: user.posts
            });
        } else {
            return res.status(500).json({msg: 'Post não pode ser adicionado ou o usuário logado não tem permissão'});
        }
    },
    async update(req, res) {
        const post = await prisma.post.update({
            where: {id: parseInt(req.params.id)},
            data: req.body
        });
        if(post) {
            return res.json({
                msg: 'Post alterado com sucesso',
                post: post
            });
        } else {
            return res.status(500).json({msg: 'Post inexistente ou não pode ser alterado'});
        }
    },
    async delete(req, res) {
        const post = await prisma.post.delete({
            where: {id: parseInt(req.params.id)}
        }).then();
        if(post) {
            return res.json({
                msg: 'Post excluido com sucesso',
            });
        } else {
            return res.status(500).json({msg: 'Post inexistente ou não pode ser removido'});
        }
    }
}