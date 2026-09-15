{{$register = Package.Raxon.Ace:Init:register()}}
{{if(!is.empty($register))}}
{{Package.Raxon.Ace:Import:role.system()}}
{{$flags = flags()}}
{{$options = options()}}
{{Package.Raxon.Ace:Setup:install($flags, $options)}}
{{/if}}