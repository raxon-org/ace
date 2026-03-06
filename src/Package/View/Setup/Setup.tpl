{{$register = Package.Raxon.App.Ace:Init:register()}}
{{if(!is.empty($register))}}
{{Package.Raxon.App.Ace:Import:role.system()}}
{{$flags = flags()}}
{{$options = options()}}
{{Package.Raxon.App.Ace:Main:install($flags, $options)}}
{{/if}}