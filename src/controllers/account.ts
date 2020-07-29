import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();


module.exports = {
    async login(req, res) {
        const user = await prisma.user.findOne({
            where: {nickname: req.body.nickname},
        });
        if(user.password == req.body.password) {
            return res.json({
                msg: 'Autorizado!',
                user: user.id,
                login: true
            });
        } else {
            return res.json({
                msg: 'Não autorizado!',
                login: false                                                                                                                                                                                                                                                                    
            });
        }
    },
    async profile(req, res) {
        const user = await prisma.user.findOne({
            where: {id: parseInt(req.params.id)}
        });
        return res.json(user);
    },
}