fs            = require 'fs'
{exec}        = require 'child_process'
util          = require 'util'
projectName   = "jquery-page-slider"

appFiles      = [
  "src/#{projectName}.coffee"
]

task 'watch', 'Watch project and build changes', ->
    invoke 'build'
    util.log "Watching for changes in src"
    for file in appFiles then do (file) ->
        fs.watchFile file, (curr, prev) ->
            if +curr.mtime isnt +prev.mtime
                util.log "#{file} changed"
                invoke 'build'
                invoke 'docs'

task 'docs', 'Build documentation', ->
  exec "docco src/*.coffee", (err, stdout, stderr) ->
    util.log (stdout + stderr)

task 'build', 'Build project', ->
  appContents = new Array remaining = appFiles.length
  for file, index in appFiles then do (file, index) ->
    fs.readFile file, 'utf8', (err, fileContents) ->
      throw err if err
      appContents[index] = fileContents
      process() if --remaining is 0
  process = ->
    fs.writeFile "lib/#{projectName}.coffee", appContents.join('\n\n'), 'utf8', (err) ->
      throw err if err
      exec "coffee --compile lib/#{projectName}.coffee", (err, stdout, stderr) ->
        if err
          util.log 'Error compiling coffee file.'
        else
          fs.unlink "lib/#{projectName}.coffee", (err) ->
            if err
              util.log "Couldn't delete lib/#{projectName}.coffee"
            util.log "Done building #{projectName}."
