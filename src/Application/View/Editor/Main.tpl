{{require(config('controller.dir.view') + config('controller.title') + '/Init.tpl')}}
{{$request.method = 'replace-with-or-append-to'}}
{{$request.target = html.target.create('section', ['name' => config('controller.name') + '-main'])}}
{{$request.append.to = 'body'}}
{{require(config('controller.dir.view') + config('controller.title') + '/Section.tpl')}}
{{script('source')}}
<script src="{{server.url('admin.workandtravel.world')}}Application/Ace/Js/Ace/01.03.24/ace.js"></script>
<script src="{{server.url('admin.workandtravel.world')}}Application/Ace/Js/Ace/01.03.24/ext-language_tools.js"></script>
{{/script}}
{{script('module')}}
{{require(config('controller.dir.view') + config('controller.title') + '/Module/' + config('controller.title') + '.js')}}
{{/script}}