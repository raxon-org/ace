import { taskbar } from "/Application/Desktop/Module/Taskbar.js";
import { getSectionById } from "/Module/Section.js";
import { dialog } from "/Dialog/Module/Dialog.js";
import { object } from "/Module/Object.js";
import user from "/Module/User.js";


let editor = {};

editor.data = {
    data : {},
    set : (attribute, value) => {
        if(typeof attribute === 'object'){
            for(let attr in attribute){
                object.set(attr, attribute[attr], editor.data.data);
            }
        } else {
            object.set(attribute, value, editor.data.data);
        }
    },
    has : (attribute) => {
        return object.has(attribute, editor.data.data);
    },
    get : (attribute) => {
        return object.get(attribute, editor.data.data);
    },
    delete : (attribute) => {
        return object.delete(attribute, editor.data.data);
    }
};

editor.init = (options) => {
    taskbar.add('application.ace.editor', options?.id);
    require([
        "/Application/Ace/Js/Ace/01.03.24/ace.js?v=" + options?.id,
    ], () => {
        editor.menu(options);
        editor.menu_application(options);
        editor.close(options);
    });

}

editor.close = (options) => {
    let section = select('#' + options?.id);
    if(!section){
        return;
    }
    let close = section.select('.close');
    close.on('click', (event) => {
        editor.data.delete('content');
        taskbar.delete(options?.id);
    });
}

editor.menu_application = (options) => {
    const section = getSectionById(options?.id);
    if(!section){
        return;
    }
    dialog.click(section, '.menu-application-ace-editor');

}

editor.menu = (options) => {
    const section = getSectionById(options?.id);
    if(!section){
        return;
    }
    const menu = section.select('.menu');
    if(!menu){
        return;
    }
    const file = menu.select('li.file');
    const menu_file = menu.select('.menu-file');
    const menu_file_protector = menu.select('.menu-file-protector');
    if(file){
        file.on('click', (event) => {
            if(menu_file) {
                menu_file.toggleClass('display-none');
            }
            if(menu_file_protector){
                menu_file_protector.toggleClass('display-none');
            }
        });
    }
    if(menu_file_protector){
        menu_file_protector.on('click', (event) => {
            if(menu_file){
                menu_file.addClass('display-none');
                menu_file_protector.addClass('display-none');
            }
        });
    }
    const menu_file_exit = menu.select('.menu-file-exit');
    if(menu_file_exit){
        menu_file_exit.on('click', (event) => {
            taskbar.delete(section.attribute('id'));
            section.remove();
        });
    }
    const menu_file_save = menu.select('.menu-file-save');
    if(menu_file_save){
        menu_file_save.on('click', (event) => {
            const pre = section.select('pre');
            editor.save({
                "pre" : {
                    "id" : pre.attribute('id')
                },
                "url" : options?.url
            });
            // taskbar.delete(section.attribute('id'));
            // section.remove();
        });
    }
    dialog.click(section, '.menu');
}

editor.save = (options) => {
    const pre = select('#' + options?.pre?.id);
    if(!pre){
        return;
    }
    const pre_content = editor.data.get('content');
    const pre_file = pre.data('file');
    header('Authorization', 'Bearer ' + user.token());
    //method = PATCH/PUT
    const data = {
        "url" : pre_file,
        "content" : pre_content,
        "request-method" : "PUT"
    };
    request(options?.url, data, (filesystem_url, response) => {
        const section = pre.closest('section');
        if(!section){
            return;
        }
        const menu = section.select('.menu');
        if(!menu){
            return;
        }
        const file = menu.select('li.file');
        if(file){
            file.trigger('click');
        }
        const input = select('input.file-manager-address');
        if(!input){
            return;
        }
        if(input.val()){
            input.trigger('change');
        } else {
            let index;
            for(index=0; index < input.length; index++){
                let item = input[index];
                item.trigger('change');
            }
        }
    });
}

editor.load = (options) => {
    /*
    const section = getSectionById(id);
    if(!section){
        return;
    }
     */
    const pre = select("#" + options?.pre?.id);
    if(!pre){
        return;
    }
    const pre_file = pre.data('file');
    console.log(pre_file);
    const pre_extension = pre.data('extension');
    header('Authorization', 'Bearer ' + user.token());
    const filesystem_url = options.url + "?url=" + pre_file;
    request(filesystem_url, null, (filesystem_url, response) => {
        if (typeof response === 'object') {
            response = JSON.stringify(response, null, 4);
        }
        editor.data.set('content', response);
        editor.ace(options?.pre?.id);
    });
}

editor.ace = (pre_id) => {
    let editor_ace = false;
    if(is.empty(editor_ace)) {
        ace.require("ace/ext/language_tools");
        editor_ace = ace.edit(pre_id);
        let pre = select("#" + pre_id);
        let extension;
        if (pre) {
            extension = pre.data('extension');
            switch (extension) {
                case 'php' :
                    editor_ace.session.setMode("ace/mode/php");
                    break;
                case 'tpl' :
                    editor_ace.session.setMode("ace/mode/smarty");
                    break;
                case 'css' :
                    editor_ace.session.setMode("ace/mode/css");
                    break;
                case 'js' :
                    editor_ace.session.setMode("ace/mode/javascript");
                    break;
                case 'json' :
                    editor_ace.session.setMode("ace/mode/json");
                    break;
                default :
                    editor_ace.session.setMode("ace/mode/php");
            }
            editor_ace.setTheme("ace/theme/tomorrow");
            // enable autocompletion and snippets
            editor_ace.setOptions({
                enableBasicAutocompletion: true,
                enableSnippets: true,
                enableLiveAutocompletion: true
            });
            editor_ace.session.setValue(editor.data.get('content'));
            // editor_ace.session.setValue(pre.data('content'));
            editor_ace.on('change', (e) => {
                editor.data.set('content', editor_ace.getValue());
                // pre.data('content', editor.data.get('content'));
            });
            editor_ace.focus();
            editor_ace.gotoLine(editor_ace.getSession().getLength(), editor_ace.getSession().getLine(editor_ace.getSession().getLength()-1).length);
        }
    }
    console.log('ace');
}

export { editor }