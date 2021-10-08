"use strict";

var Article = {};

function add(user_id, article_id, caption, link, file, heart_count, comment_l) {
  Article.own = user_id;
  Article.id = article_id;
  Article.caption = caption;
  Article.link = link;
  Article.file = file;
  Article.heart = heart_count;
  Article.comment = comment_l;
}