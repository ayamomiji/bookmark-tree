(function() {
  var startTime;
  startTime = new Date().getTime();
  jQuery(function($) {
    var bookmarkBehaviors, buildBookmark, buildDirectory, buildIcon, buildNode, closeDirectory, directoryBehaviors, openDirectory, openingDirectory, sort, tmpl, tree, treeData, urlBar;
    urlBar = $('#url');
    tree = $('#tree');
    treeData = {};
    tmpl = {
      bookmark: $('#bookmark-tmpl'),
      icon: $('#icon-tmpl'),
      directory: $('#directory-tmpl')
    };
    openingDirectory = JSON.parse(localStorage.openingDirectory || '{}');
    if (location.search !== '?full') {
      $('body').width(options.width);
      $('#tree').height(options.height);
      $('#tree').css('max-height', options.height);
    } else {
      $('#url').css({
        position: 'fixed',
        width: '100%',
        bottom: 0
      });
      $('#tree').css({
        position: 'fixed',
        top: 0,
        bottom: '1em',
        left: 0,
        right: 0
      });
    }
    $(window).resize(function() {
      var border;
      border = $('#tree').outerWidth() - $('#tree').innerWidth();
      return $('#tree').width($(window).width() - border);
    });
    chrome.bookmarks.getTree(function(nodes) {
      var child, node, rootId, spentTime, _i, _len, _ref;
      rootId = options.rootDirectory;
      while (node = nodes.pop()) {
        treeData[node.id] = node;
        if (node.children) {
          _ref = node.children;
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            child = _ref[_i];
            nodes.push(child);
          }
        }
      }
      treeData[0].title = '(root)';
      sort(treeData[rootId].children).forEach(function(child) {
        return tree.find('ul:first').append(buildNode(child));
      });
      spentTime = new Date().getTime() - startTime;
      return urlBar.text("Spent time: " + spentTime + " ms.");
    });
    buildNode = function(node) {
      if (node.children) {
        return buildDirectory(node);
      } else {
        if (node.title === '') {
          return buildIcon(node);
        } else {
          return buildBookmark(node);
        }
      }
    };
    buildDirectory = function(node) {
      var elem;
      elem = tmpl.directory.tmpl(node);
      if (openingDirectory[node.id]) {
        openDirectory(elem);
      }
      return elem;
    };
    buildBookmark = function(node) {
      return tmpl.bookmark.tmpl(node);
    };
    buildIcon = function(node) {
      return tmpl.icon.tmpl(node);
    };
    openDirectory = function(elem) {
      var children, id, node;
      id = elem.attr('data-id');
      node = treeData[id];
      elem.addClass('open');
      elem.find('.title .favicon:first').attr('src', 'open.png');
      children = elem.find('.children:first');
      if (children.find('li').size() === 0) {
        sort(node.children).forEach(function(child) {
          return children.append(buildNode(child));
        });
      }
      if (options.rememberOpenedDirectory) {
        openingDirectory[id] = true;
        return localStorage.openingDirectory = JSON.stringify(openingDirectory);
      }
    };
    closeDirectory = function(elem) {
      var id;
      id = elem.attr('data-id');
      elem.removeClass('open');
      elem.find('.title .favicon:first').attr('src', 'close.png');
      if (options.rememberOpenedDirectory) {
        openingDirectory[id] = null;
        return localStorage.openingDirectory = JSON.stringify(openingDirectory);
      }
    };
    sort = function(nodes) {
      switch (options.sortBy) {
        case 'index':
          return nodes.sort(function(b1, b2) {
            return b1.index - b2.index;
          });
        case 'id':
          return nodes.sort(function(b1, b2) {
            return b1.id - b2.id;
          });
        case 'dateAdded':
          return nodes.sort(function(b1, b2) {
            return b1.dateAdded - b2.dateAdded;
          });
        case 'title':
          return nodes.sort(function(b1, b2) {
            var _ref;
            return (_ref = b1.title.toLowerCase() > b2.title.toLowerCase()) != null ? _ref : {
              1: -1
            };
          });
        default:
          return nodes;
      }
    };
    $('.directory > .title').live('mouseup', function(e) {
      var directory, id, node, self;
      self = $(this);
      directory = self.parent();
      id = directory.attr('data-id');
      node = treeData[id];
      switch (e.button) {
        case 0:
          return directoryBehaviors[options.behaviors.directory.left](node);
        case 1:
          return directoryBehaviors[options.behaviors.directory.middle](node);
        case 2:
          return directoryBehaviors[options.behaviors.directory.right](node);
      }
    });
    directoryBehaviors = {
      toggle: function(node) {
        var directory;
        directory = $("[data-id=" + node.id + "]");
        if (directory.hasClass('open')) {
          return closeDirectory(directory);
        } else {
          return openDirectory(directory);
        }
      },
      openAllInCurrentWindow: function(node) {
        treeData[node.id].children.forEach(function(child) {
          return chrome.tabs.create({
            url: child.url
          });
        });
        if (options.closePopupAfterOpenBookmark) {
          return window.close();
        }
      },
      openAllInNewWindow: function(node) {
        chrome.extension.sendRequest({
          type: 'openAllInNewWindow',
          directory: node
        });
        if (options.closePopupAfterOpenBookmark) {
          return window.close();
        }
      }
    };
    $('.bookmark > .title, .icon > .title').live('mouseup', function(e) {
      var bookmark, id, node, self;
      self = $(this);
      bookmark = self.parent();
      id = bookmark.attr('data-id');
      node = treeData[id];
      switch (e.button) {
        case 0:
          return bookmarkBehaviors[options.behaviors.bookmark.left](node);
        case 1:
          return bookmarkBehaviors[options.behaviors.bookmark.middle](node);
        case 2:
          return bookmarkBehaviors[options.behaviors.bookmark.right](node);
      }
    });
    bookmarkBehaviors = {
      openInNewTab: function(node) {
        chrome.tabs.create({
          url: node.url
        });
        if (options.closePopupAfterOpenBookmark) {
          return window.close();
        }
      },
      openInCurrentTab: function(node) {
        chrome.tabs.getSelected(null, function(tab) {
          return chrome.tabs.update(tab.id, {
            url: node.url
          });
        });
        if (options.closePopupAfterOpenBookmark) {
          return window.close();
        }
      },
      openInBackgroundTab: function(node) {
        chrome.tabs.create({
          url: node.url,
          selected: false
        });
        if (options.closePopupAfterOpenBookmark) {
          return window.close();
        }
      },
      openInNewWindow: function(node) {
        chrome.windows.create({
          url: node.url
        });
        if (options.closePopupAfterOpenBookmark) {
          return window.close();
        }
      }
    };
    $('.bookmark > .title').live('mousemove', function() {
      var id;
      id = $(this).parent().attr('data-id');
      return urlBar.text(treeData[id].url);
    });
    $('body').css({
      fontFamily: options.font.fontFace,
      fontSize: options.font.fontSize
    });
    $('style').html(options.customStyle);
    if (options.hideScrollbar) {
      return $('#tree').css({
        overflow: 'hidden'
      }).bind('mousewheel', function(e) {
        var self;
        self = $(this);
        return self.scrollTop(self.scrollTop() - e.wheelDelta);
      });
    }
  });
}).call(this);
