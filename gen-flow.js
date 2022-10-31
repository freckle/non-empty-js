const {beautify, compiler} = require('flowgen')
const fs = require('fs')
const glob = require('glob')
const path = require('path')

glob('./dist/**/*.d.ts', {}, (err, files) => {
  if (err) console.error(err)
  files.forEach(f => {
    const flowdef = beautify(compiler.compileDefinitionFile(f))
    const fixedFlowdef = fixFlowdef(flowdef)
    const p = path.parse(f)
    const name = /(.*).d/.exec(p.name)[1]
    fs.writeFile(
      `${p.dir}/${name}.js.flow`,
      `//@flow
${fixedFlowdef}`,
      e => {
        if (e) console.error(e)
      }
    )
  })
})

const fixFlowdef = module => {
  return (
    module
      // https://github.com/joarwilk/flowgen/issues/185
      .replace(/\btype,\s+/g, 'type ')
      // Replace lodash TypeScript types with Flow equivalents
      .replaceAll('type ArrayIterator, type ListIterator', 'type ReadOnlyMapIterator') // import
      .replaceAll('ArrayIterator', 'ReadOnlyMapIterator') // tokens
      .replaceAll('ListIterator', 'ReadOnlyMapIterator')
  )
}
