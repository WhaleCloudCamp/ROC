const Generator = require("yeoman-generator");
const { basename } = require("path");

module.exports = class AppGenerator extends Generator {
  constructor(args, opts, props) {
    super(args, opts);

    this.name = basename(process.cwd());
    this.props = props;
  }

  writing() {
    const { demo, pages, routes, filePath } = this.props;
    const filePathMain = `.cache/${filePath}/whaleApp/`;
    this.fs.copy(
      this.templatePath("app", ".expo"),
      this.destinationPath(`${filePathMain}.expo`)
    );
    this.fs.copy(
      this.templatePath("app", "assets"),
      this.destinationPath(`${filePathMain}assets`)
    );
    this.fs.copy(
      this.templatePath("app", "combination"),
      this.destinationPath(`${filePathMain}combination`)
    );
    // this.fs.copy(this.templatePath('app', 'pages'), this.destinationPath(`${filePathMain}pages`));
    // this.fs.copy(this.templatePath('app', 'routes'), this.destinationPath(`${filePathMain}routes`));
    this.fs.copy(
      this.templatePath("app", "_gitignore"),
      this.destinationPath(`${filePathMain}.gitignore`)
    );
    this.fs.copy(
      this.templatePath("app", ".babelrc"),
      this.destinationPath(`${filePathMain}.babelrc`)
    );
    this.fs.copy(
      this.templatePath("app", ".watchmanconfig"),
      this.destinationPath(`${filePathMain}.watchmanconfig`)
    );
    this.fs.copy(
      this.templatePath("app", "App.js"),
      this.destinationPath(`${filePathMain}App.js`)
    );
    this.fs.copy(
      this.templatePath("app", "app.json"),
      this.destinationPath(`${filePathMain}app.json`)
    );
    this.fs.copy(
      this.templatePath("app", "package.json"),
      this.destinationPath(`${filePathMain}package.json`)
    );

    this.fs.copyTpl(
      this.templatePath("ejs", "demo.js"),
      this.destinationPath(`${filePathMain}pages/demo/index.js`),
      this.props
    );
    this.fs.copyTpl(
      this.templatePath("ejs", "routes.js"),
      this.destinationPath(`${filePathMain}routes/index.js`),
      this.props
    );
    pages.map(page => {
      this.fs.copyTpl(
        this.templatePath("ejs", "page.js"),
        this.destinationPath(`${filePathMain}pages/${page.title}/index.js`),
        page
      );
    });
  }
  delete() {}
};
