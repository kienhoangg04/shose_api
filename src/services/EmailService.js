'use strict';
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

const sendEmailCreateOrder = async (email, orderItems) => {
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: process.env.MAIL__ACCOUNT,
            pass: process.env.MAIL__PASSWORD,
        },
    });

    let listItem = '';
    const attachImage = [];
    orderItems.forEach((order) => {
        listItem += `<div>
    <div>
      Bạn đã đặt sản phẩm <b>${order.name}</b> với số lượng: <b>${order.amount}</b> và giá là: <b>${order.price} VND</b></div>
      <div>Bên dưới là hình ảnh của sản phẩm</div>
    </div>`;
        attachImage.push({ path: order.image });
    });

    let info = await transporter.sendMail({
        from: process.env.MAIL__ACCOUNT,
        to: email,
        subject: 'Breshka Shose ✔',
        text: 'Cảm ơn bạn đã đặt hàng tại Breshka Shose!',
        html: `<div><b>Bạn đã đặt hàng thành công tại shop Breshka Shose</b></div> ${listItem}`,
        attachments: attachImage,
    });
};

module.exports = {
    sendEmailCreateOrder,
};
