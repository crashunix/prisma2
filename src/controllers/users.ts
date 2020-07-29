import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();


module.exports = {
    async index(req, res) {
        const users = await prisma.user.findMany();
        if (users) {
            return res.status(200).json(users);
        } else {
            return res.status(500).json({
                msg: 'Não existem usuários'
            });
        }
    },
    async show(req, res) {
        const user = await prisma.user.findOne({
            where: {id: parseInt(req.params.id)}
        });
        if (user) {
            return res.status(200).json(user);
        } else {
            return res.status(500).json({
                msg: 'Usuário inexistente'
            });
        }
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
        if(user) {
            return res.status(200).json({
                msg: 'Usuário criado com sucesso',
                user: user
            });
        } else {
            return res.status(500).json({
                msg: 'Usuário não inserido'
            });
        }
    },
    async update(req, res) {
        const user = await prisma.user.update({
            where: {id: parseInt(req.params.id)},
            data: req.body
        });
        if(user) {
            return res.status(200).json({
                msg: 'Usuário alterado com sucesso',
                user: user
            });
        } else {
            return res.status(500).json({
                msg: 'Usuário inválido ou não pode ser alterado'
            });
        }
    },
    async delete(req, res) {
        const user = await prisma.user.delete({
            where: {id: parseInt(req.params.id)}
        }).then();
        if(user) {
            return res.status(200).json({
                msg: 'Usuário excluido com sucesso',
            });
        } else {
            return res.status(500).json({
                msg: 'Usuário é invalido ou não pode ser exluido'
            });
        }
    }
}