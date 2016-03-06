// 定义原型，导入 toggle btn 和 parent active class name
// 点击按钮，添加自定义 active class name 到按钮的 parent 上，再次点击，remove active class
// 按钮状态，content 状态用 css 控制

<div class="active">
  <btn>
  <toggle content>

(function () {
  // invoke myself

  function myToggleButton(button, activeClassName){
    var self = this;
    self.activeClassName = typeof activeClassName === 'undefined' ? "active" : activeClassName;
    self.btn = $(button);
    self.btn.click(function(){
      self.toggle();
    });

    self.toggle = function(){
      if (self.expanded) {
        self.collapse();
      } else {
        self.expand();
      }
    }

    self.collapse = function(){
      self.expanded = false;
      self.btn.attr('aria-expanded', false).attr('aria-label', 'Open menu');
      if(self.btn.parent() != null){
        self.btn.parent().removeClass(self.activeClassName);
      }
    }

    self.expand = function(){
      self.expanded = true;
      self.btn.attr('aria-expanded', true).attr('aria-label', 'Close menu');
      if(self.btn.parent() != null){
        self.btn.parent().addClass(self.activeClassName);
      }
    }
  }


  var myBtn = new myToggleButton(".myBtn", "_active");
})();
