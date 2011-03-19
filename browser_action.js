(function() {
  var startTime;
  startTime = new Date().getTime();
  jQuery(function($) {
    var bookmarkBehaviors, buildBookmark, buildDirectory, buildNode, closeDirectory, directoryBehaviors, openDirectory, openingDirectory, tmpl, tree, treeData, urlBar;
    urlBar = $('#url');
    tree = $('#tree');
    treeData = {};
    tmpl = {
      bookmark: $('#bookmark-tmpl'),
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
      treeData[rootId].children.forEach(function(child) {
        return tree.find('ul:first').append($('<li></li>').append(buildNode(child)));
      });
      spentTime = new Date().getTime() - startTime;
      return urlBar.text("Spent time: " + spentTime + " ms.");
    });
    buildNode = function(node) {
      if (node.children) {
        return buildDirectory(node);
      } else {
        return buildBookmark(node);
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
    openDirectory = function(elem) {
      var children, id, node;
      id = elem.attr('data-id');
      node = treeData[id];
      elem.addClass('open');
      elem.find('.title .favicon:first').attr('src', 'open.png');
      children = elem.find('.children:first');
      if (children.find('li').size() === 0) {
        node.children.forEach(function(child) {
          return children.append($('<li></li>').append(buildNode(child)));
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
        return treeData[node.id].children.forEach(function(child) {
          return chrome.tabs.create({
            url: child.url
          });
        });
      },
      openAllInNewWindow: function(node) {
        return chrome.extension.sendRequest({
          type: 'openAllInNewWindow',
          directory: node
        });
      }
    };
    $('.bookmark > .title').live('mouseup', function(e) {
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
        return chrome.tabs.create({
          url: node.url
        });
      },
      openInCurrentTab: function(node) {
        return chrome.tabs.getSelected(null, function(tab) {
          return chrome.tabs.update(tab.id, {
            url: node.url
          });
        });
      },
      openInBackgroundTab: function(node) {
        return chrome.tabs.create({
          url: node.url,
          selected: false
        });
      },
      openInNewWindow: function(node) {
        return chrome.windows.create({
          url: node.url
        });
      }
    };
    $('.bookmark > .title').live('mousemove', function() {
      var id;
      id = $(this).parent().attr('data-id');
      return urlBar.text(treeData[id].url);
    });
    return $('style').html(options.customStyle);
  });
}).call(this);
