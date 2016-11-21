#!/usr/bin/env node

import {Glob} from 'glob';
import {readFileSync, writeFileSync} from 'fs';
import {normalize, resolve} from 'path';

function writeIndex(files: string[]):void{
    const exportExpression= (file: string): string =>{
        const relativePath = file.replace(/(\.ts)$/, '').replace(/\\/g, '/');
        return `export * from '${relativePath}';`;
    };
    const data = files.reduce((result, item) => result += `${exportExpression(item)}\n`, '');
    writeFileSync('./index.ts', data, 'utf8');
}

function updateFiles(files: string[]): void{
    const path = './package.json';
    const isDefinition = new RegExp('.d.ts$');
    const fileOptions = {encoding: "utf-8"};
    const content = JSON.parse(readFileSync(path, fileOptions));
    content.files = files
        .filter(file=> !isDefinition.test(file))
        .map(file => normalize(file.replace(/(\.ts)$/, '.js')))
        .concat(files
            .filter(file=> !isDefinition.test(file))
            .map(file=> normalize(file.replace(/(\.ts)$/, '.d.ts'))))
        .concat(files
            .filter(file=> isDefinition.test(file))
            .map(file=> normalize(file)))
        .concat(['index.js', 'index.d.ts']);
    writeFileSync(path, JSON.stringify(content, null, 2), 'utf8');
}

new Glob('./lib/**/*.ts', (error:Error, files: string[])=>{
    writeIndex(files);
    updateFiles(files)
});