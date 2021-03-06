const BaseController = require("cview-basecontroller");
const PageViewerController = require(".");
const PageControl = require("cview-pagecontrol");

const a = new BaseController({
  events: {
    didLoad: () => {
      a.rootView.add({
        type: "view",
        props: {
          bgcolor: $color("red")
        },
        layout: $layout.fill
      })
    }
  }
});
const b = new BaseController({
  events: {
    didLoad: () => {
      b.rootView.add({
        type: "view",
        props: {
          bgcolor: $color("green")
        },
        layout: $layout.fill
      })
    }
  }
});
const c = new BaseController({
  events: {
    didLoad: () => {
      c.rootView.add({
        type: "view",
        props: {
          bgcolor: $color("blue")
        },
        layout: $layout.fill
      })
    }
  }
});
const pvc = new PageViewerController({
  props: {
    type: (1 << 3) | (1 << 0),
    items: [
      {
        controller: a,
        title: "一号"
      },
      {
        controller: b,
        title: "二号"
      },
      {
        controller: c,
        title: "三号"
      }
    ],
    navBarProps: {
      rightBarButtonItems: [
        {
          symbol: "ellipsis"
        }
      ],
      popButtonEnabled: true
    }
  },
  events: {
    didLoad: controller => {
      controller.rootView.add(new PageControl({
        props: {
          numberOfPages: 3,
          currentPage: 1,
        },
        layout: (make, view) => {
          make.centerX.equalTo(view.super.centerX)
          make.size.equalTo($size(200, 20))
          make.bottom.inset(50)
        }
      }))
    }
  }
});

pvc.uirender({
  navBarHidden: true,
  statusBarStyle: 0
});
