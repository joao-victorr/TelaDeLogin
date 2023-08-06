import {Response, Request } from "express";
import { PizzariaUsers } from "../models/pizzaria";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";


export const loginGet = async (req: Request, res: Response) => {
    res.render('login');
};

export const loginPost = async (req: Request, res: Response) => {

    const email: string = req.body.email;
    const password: string = req.body.password.trim();

    if (email && password) {

        let userEmail = await PizzariaUsers.findOne({ 
            where: {
                email: email
            }
         });

         if(userEmail && bcrypt.compareSync(password, userEmail.password)) {

            res.redirect('/')

         } else {

            res.render('login', {
                incorrect: true
            })
         }

    } else {
        res.render('login', {
            campoVazio: true
        });
    }
};

export const cadastroGet = async (req: Request, res: Response) => {
    res.render('cadastro');
};

export const cadastroPost = async (req: Request, res: Response) => {

    const { name, email, password } = req.body;

    let verifyEmail = await PizzariaUsers.findAll({
        where: {
            email: email
        }
    })

    if (name && email && password) {

        if (verifyEmail.length == 0) {
        
            await PizzariaUsers.create({
                name,
                email,
                password
            });

            //verification email

            var transport = nodemailer.createTransport({
                host: "sandbox.smtp.mailtrap.io",
                port: 2525,
                auth: {
                  user: "467af6baf759c6",
                  pass: "edf66d171760ac"
                }
              });

            var messagen = await transport.sendMail({
                from: '"Pessoa teste" <pessoa@teste.com',
                to: email,
                subject: "Email com Nodemailer",
                text: "1234",
                html: "<p> texto teste<p>"
            });

            
            res.status(201).redirect('/login');
    
        } else {
            res.status(400).render("cadastro", {
                error: true
            })
        }

    } else {
        res.status(400).render("cadastro", {
            campoVazio: true
        })
    }
};