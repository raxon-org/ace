{{$pre.content = "Loading..."}}
<div class="dialog dialog-{{config('controller.name')}}-main">
    <div class="head" data-title="Ace editor | {{$request.file|>file.basename}}">
        <h1><img src="{{route.get('application-ace-editor-icon')}}" class="icon" /> Ace editor</h1>
        <span class="close"><i class="fas fa-window-close"></i></span>
        <span class="minimize"><i class="far fa-window-minimize"></i></span>
    </div>
    <div class="menu">
        <ul>
            <li class="file">File</li>
        </ul>
        <div class="menu-file-protector display-none">
        </div>
        <div class="menu-file display-none">
            <ul>
                /*
                <li>New</li>
                <li>Open</li>
                <li class="menu-file-save">Save</li>
                <li>Save as</li>
                <li>Print</li>
                */
                <li class="menu-file-save">Save</li>
                <li class="menu-file-exit">Exit</li>
            </ul>
        </div>
    </div>
    <div class="menu-application-ace-editor">
        <ul>
            <li>{{$request.file|>file.basename}}</li>
        </ul>
    </div>
    <div class="body">
        <pre
            id="{{$pre.id}}"
            name="{{$pre.name}}"
            data-content="{{$pre.content|>html.entity.encode}}"
            data-file="{{$request.file}}"
            data-extension="{{file.extension($request.file)}}"
        >
        </pre>
    </div>
    <div class="footer">

    </div>
</div>