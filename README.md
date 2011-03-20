ayaya's Bookmark Tree
=====================

A Google Chrome extension that provides a button to show bookmark tree and open bookmark in new tab.

https://chrome.google.com/webstore/detail/dneehabidhbfdiohdhbhjbbljobchgab

How to make a theme
-------------------

The HTML Structures are:

    div#tree
      ul
        li.node.directory.open        opening directory
          div.title                   contains favicon and link
            img.favicon               favicon
            span.link                 link text
          ul.children                 contains many li.node ...
            li.node * n
        li.node.directory             closed directory
          div.title
            img.favicon
            span.link
          ul.children                 contains nothing, children nodes are lazy created
        li.node.bookmark
          div.title
            img.favicon
            span.link
    div#url

`.node` matches any directories (with children) and bookmarks.

`.title` matches any links with favicon.

`.favicon` only matches favicon.

`.link` only matches link text.

`#tree` matches tree container.

`#url` matches url bar.

### An example

This example was modified from published review by eboyjr:

    #tree {
      padding: 3px;
      background-color: #DFDFDF;
      border: 1px solid #ACB4C4;
    }
    .title {
      color: #002063;
      display: inline-block;
      -webkit-border-radius: 5px;
      border: 1px solid #DFDFDF;
      -webkit-transition-duration: .2s;
    }
    .title:hover {
      background-color: #F2F4F7;
      border: 1px solid #C7C7C7;
    }

License
-------

GNU GPLv3
