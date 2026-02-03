#!/bin/bash

mkdir "src/features/$1"
mkdir "src/features/$1/controller"
mkdir "src/features/$1/form"

echo -e "import Form from '../../../form';
import Controller from '../../../interface/controller';
import Modal from '../../../modal';

export default class Create${1^} extends Controller {
    async execute(form: Form) {
        console.log('entrou no create $1');
        console.log(form);
    }
}" >> "src/features/$1/controller/index.ts"

echo -e "import App from '../../../app';
import Form from '../../../form';
import { Field, Fields } from '../../../form/field';
import Create${1^} from '../controller';
export default class FormCreate${1^} extends Form {
    model: any;
    lista: any;
    app: App;
    constructor(app: App, model: any) {
        super(model, 'TITULO', new Create${1^}(app), {back: 'none', next: 'Criar'})
        this.app = app
        this.model = model
    }
    async getFields(): Promise<Fields> {
        const fields: Fields = {
            "titulo": Field.make('text', 'Título', 'Texto'),
        };
        return fields
    }
}" >> "src/features/$1/form/index.ts"