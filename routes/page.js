var express = require("express");
var router = express.Router();
var Generator = require("../tools/AppGenerator");
var yParser = require("yargs-parser");

router.post("/", function(req, res, next) {
  try {
    const { views } = req.body;
    console.log(views);
    let pages = [];
    let dataSourceItem = "";
    let importStr = "";
    let routeItem = "";
    const generatorComStr = (coms, modulecoms, modules) => {
      let pagecontent = "";
      if (coms && coms.length > 0) {
        coms.map(item => {
          const { component, childrenCom } = item;
          if (component.state === 2) {
            modulecoms[component.type] = 1;
          } else {
            modules[component.type] = 1;
          }
          let comStr = "";
          if (childrenCom && childrenCom.length > 0) {
            comStr = `<${component.type} {...${JSON.stringify(
              component.props
            )}} style={${JSON.stringify(component.style)}} >${generatorComStr(
              childrenCom,
              modulecoms,
              modules
            )}</${component.type}>`;
          } else {
            comStr = `<${component.type} {...${JSON.stringify(
              component.props
            )}} style={${JSON.stringify(component.style)}} />`;
          }
          pagecontent += comStr;
        });
      }
      return pagecontent;
    };
    views.map((view, index) => {
      const { components, name } = view;
      let pagecontent = "";
      const modules = {};
      const modulecoms = {};
      pagecontent = generatorComStr(components, modulecoms, modules);
      const modilesStr = Object.keys(modules).join(",");
      const modulecomsStr = Object.keys(modulecoms).join(",");
      let impModules = "";
      if (modilesStr !== "")
        impModules += `import {${modilesStr}} from "antd-mobile-rn";`;
      if (modulecomsStr !== "")
        impModules += `import {${modulecomsStr}} from "combination";`;
      const page = {
        importStr: impModules,
        componentStr: pagecontent,
        title: name
      };
      pages.push(page);
      const upperName = name.substring(0, 1).toUpperCase() + name.substring(1);
      dataSourceItem += `{title:'${name}',routeName:'${upperName}'},`;
      importStr += `import ${upperName} from '../pages/${name}';`;
      routeItem += `${upperName}: { screen: ${upperName} },`;
    });

    const props = {
      filePath: new Date().getTime(),
      demo: {
        dataSourceItem: dataSourceItem
      },
      pages: pages,
      routes: {
        importStr: importStr,
        routeItem: routeItem
      }
    };

    const args = yParser(process.argv.slice(2));

    const generator = new Generator(
      process.argv.slice(2),
      {
        name: "basic",
        env: {
          cwd: process.cwd()
        },
        resolved: __dirname
      },
      props
    );
    generator.run(() => {
      if (args._[0]) {
        clipboardy.writeSync(`cd ${args._[0]}`);
        console.log("📋  Copied to clipboard, just use Ctrl+V");
        res.status(500).send({ error: args._[0] });
      } else {
        res.json({ filePath: props.filePath });
      }
    });
  } catch (error) {
    res.json({ code: 500, message: "服务端出错了！" });
  }
});

module.exports = router;
