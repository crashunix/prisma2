import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();


module.exports = {
    async index(req, res) {
        const users = await prisma.user.findMany();
        return res.json(users);
    },
    async show(req, res) {
        const user = await prisma.user.findOne({
            where: {id: parseInt(req.params.id)}
        });
        return res.json(user);
    },
    async store(req, res) {
        const user = await prisma.user.create({
            data: {
                name: req.body.name,
                nickname: req.body.nickname,
                email: req.body.email,
                role: req.body.role,
                password: req.body.password
            }
        });
        return res.json({
            msg: 'Usuário criado com sucesso',
            user: user
        });
    },
    async update(req, res) {
        const user = await prisma.user.update({
            where: {id: parseInt(req.params.id)},
            data: req.body
        });
        return res.json({
            msg: 'Usuário alterado com sucesso',
            user: user
        });
    },
    async delete(req, res) {
        await prisma.user.delete({
            where: {id: parseInt(req.params.id)}
        }).then();
        return res.json({
            msg: 'Usuário excluido com sucesso',
        });
    }
}