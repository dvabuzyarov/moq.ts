System.config({
    baseURL: '.',
    transpiler: 'typescript',
    typescriptOptions: {
        'experimentalDecorators': true,
        'emitDecoratorMetadata': true
    },
    map: {
    },
    paths: {
        'typescript': 'node_modules/typescript/lib/typescript.js',
        'systemjs': 'node_modules/systemjs/dist/system.src.js',
        'system-polyfills': 'node_modules/systemjs/dist/system-polyfills.src.js',
        'es6-module-loader': 'node_modules/es6-module-loader/dist/es6-module-loader.js'
    },
    packages: {
        'typescript': {
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