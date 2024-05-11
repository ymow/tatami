import n from"child_process";import t from"path";import r from"bl";import e from"through2";var i={};const o=n.spawn,p=n.exec,f=t,u=r,m=e,c="html",s="js",a="utf8";var d={};function fromString(n,t,r){var e=u(),i=u(),o=0,exitClose=function(){++o<2||r(null,e.slice())};n.stdout.pipe(e);n.stderr.pipe(i);n.on("exit",(function(n){if(0!==n){o=-1;return r(new Error("Error calling `pygmentize`: "+i.toString()))}exitClose()}));n.on("close",exitClose);n.stdin.write(t);n.stdin.end()}function fromStream(n,t,r){var e=u(),i=m((function(t,r,e){n.__write(t,r,e)}));t.pipe(r.stdin);r.stdout.pipe(i);r.stderr.pipe(e);r.on("exit",(function(t){0!==t&&n.emit("error",e.toString());n.__end()}))}function pygmentize(n,t,r){n=n||{};var e=["-f",n.format||c,"-l",n.lang||s,"-P","encoding="+(n.encoding||a)],i="string"==typeof t&&"function"==typeof r,o=!i&&m(),p=!i&&m();"object"==typeof n.options&&Object.keys(n.options).forEach((function(t){e.push("-P",t+"="+n.options[t])}));spawnPygmentize(n,e,(function(n,e){if(i)return n?r(n):fromString(e,t,r);if(n)return o.emit("error",n);fromStream(o,p,e)}));if(o){o.__write=o.write;o.write=p.write.bind(p);o.__end=o.end;o.end=p.end.bind(p)}return o}function spawnPygmentize(n,t,r){var e="string"==typeof n.python?n.python:"python";pythonVersion(e,(function(n,i){if(n)return r(n);if(2!=i&&3!=i)return r(new Error("Unsupported Python version: "+i));var p=f.join(new URL(import.meta.url.slice(0,import.meta.url.lastIndexOf("/"))).pathname,"vendor/pygments",2==i?"build-2.7":"build-3.3","pygmentize");r(null,o(e,[p].concat(t)))}))}function pythonVersion(n,t){if(d[n])return t(null,d[n]);p(n+" -V",(function(r,e,i){if(r)return t(r);var o=i.toString().match(/^Python (\d)[.\d]+/i);o||(o=e.toString().match(/^Python (\d)[.\d]+/i));if(!o)return t(new Error("Cannot determine Python version: ["+i.toString()+"]"));d[n]=+o[1];return t(null,+o[1])}))}i=pygmentize;var l=i;export default l;

