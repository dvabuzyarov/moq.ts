System.config({
    baseURL: '.',
    transpiler: 'ts',
    typescriptOptions: {
        'experimentalDecorators': true,
        'emitDecoratorMetadata': true
    },
    meta: {
        typescript: {
            exports: "ts"
        }
    },
    map: {},
    paths: {
        'typescript': 'node_modules/typescript/lib/typescript.js',
        'systemjs': 'node_modules/systemjs/dist/system.src.js',
        'ts': 'node_modules/plugin-typescript/lib/plugin.js'
    },
    packages: {
        typescript: {
            defaultExtension: 'js'
        },
        ts: {
            defaultExtension: 'js'
        },
        lib: {
            defaultExtension: 'ts'
        },
        './': {
            defaultExtension: 'ts'
        }
    }
});
