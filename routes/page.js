var express = require("express");
var router = express.Router();

router.post("/", function(req, res, next) {
  console.log("11111");
  //这里取到了配置数据
  const modules={};
  let pagecontent = "";
  const {components}=req.body;
  components.map(item => {
    const {component}=item;
    modules[component.type]=1;
    pagecontent+=`<${component.type} {...${JSON.stringify(component.props)}} style={${JSON.stringify(component.style)}} />`
  }) 
  const impModules = `import {${Object.keys(modules).join(',')}} from "whale-rn";`
  res.json({impModules,pagecontent});
});

module.exports = router;
