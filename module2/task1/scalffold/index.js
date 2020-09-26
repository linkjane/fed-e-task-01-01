#!/usr/bin/env node

const inquirer = require('inquirer');
const ejs = require('ejs');
const fs = require('fs');
const path = require('path');


inquirer
  .prompt([
    {
      name: 'projectName',
      message: '请输入项目名称',
      type: 'input',
    }
  ])
  .then(answers => {
    console.log(answers)

    const templateDir = path.join(__dirname, 'templates');
    const destDir = process.cwd();

    fs.readdir(templateDir, (err, files) => {
      if(err) throw err;
      files.forEach(file => {
        ejs.renderFile(path.join(templateDir, file), answers, (err, result) => {
           if (err) throw err;
           fs.writeFile(path.join(destDir, file), result, err =>{
             if (err) throw err;
           })
        })
      })
    })

  })
  .catch(error => {
  });
