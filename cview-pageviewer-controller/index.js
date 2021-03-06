const BaseController = require("cview-basecontroller");
const PageViewer = require("cview-pageviewer");
const PageViewerTitleBar = require("cview-pageviewer-titlebar");
const CustomNavigationBar = require("cview-custom-navigationbar");

class PageViewerController extends BaseController {
  constructor({ props, layout, events = {} } = {}) {
    props = { type: 1 << 3, index: 0, ...props };
    super({ props, layout, events });
  }

  _create() {
    this.cviews.pageviewer = new PageViewer({
      props: {
        page: this._props.index,
        cviews: this._props.items.map(n => n.controller.rootView)
      },
      layout: (make, view) => {
        make.left.right.bottom.inset(0)
        make.top.equalTo(view.prev.bottom)
      },
      events: {
        floatPageChanged: (cview, floatPage) => (this.cviews.titlebar.floatedIndex = floatPage)
      }
    });
    this.cviews.titlebar = new PageViewerTitleBar({
      props: {
        items: this._props.items.map(n => n.title),
        index: this._props.index
      },
      layout: $layout.fill,
      events: {
        changed: (cview, index) => this.cviews.pageviewer.scrollToPage(index)
      }
    });
    this.cviews.navbar = new CustomNavigationBar({
      props: {
        ...this._props.navBarProps,
        titleView: this.cviews.titlebar
      }
    });
    this.rootView.views = [this.cviews.navbar, this.cviews.pageviewer]
    super._create();
  }

  get index() {
    return this._props.index
  }

  set index(num) {
    this.cviews.titlebar.index = num
    this.cviews.pageviewer.page = num
    this._props.index = num
  }
}

module.exports = PageViewerController;
