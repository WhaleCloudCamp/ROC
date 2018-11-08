var express = require("express");
var router = express.Router();
var Generator = require("../tools/AppGenerator");
var yParser = require("yargs-parser");

router.post("/", function(req, res, next) {
  try {
    //这里取到了配置数据
    const modules = {};
    const { views } = req.body;
    console.log(views);
    let pages = [];
    let dataSourceItem = "";
    let importStr = "";
    let routeItem = "";
    views.map((view, index) => {
      const { components, name } = view;
      let pagecontent = "";
      components.map(item => {
        const { component } = item;
        modules[component.type] = 1;
        pagecontent += `<${component.type} {...${JSON.stringify(
          component.props
        )}} style={${JSON.stringify(component.style)}} />`;
      });

      const impModules = `import {${Object.keys(modules).join(
        ","
      )}} from "antd-mobile-rn";`;
      const page = {
        importStr: impModules,
        componentStr: pagecontent,
        title: name
      };
      pages.push(page);
      dataSourceItem += `{title:'${name}',routeName:'${name.toUpperCase()}'},`;
      importStr += `import ${name.toUpperCase()} from '../pages/${name}';`;
      routeItem += `${name.toUpperCase()}: { screen: ${name.toUpperCase()} },`;
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
