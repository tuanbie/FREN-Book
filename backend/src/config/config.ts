export const elasticConfig = {
  node: "http://localhost:9200",
  indexBook: "books",
  indexUser: "users",
  indexComment: "comments",
};

export const messageBookConfig = {
  notfound:"Book not found",
  errorUpdatebook:"Error updating book",
  errorCreateBook:"Error creating book",
  errorRetriveingBook:"Error retrieving book ",
  errorNotFoundOrChange:"Book not found or no change ",
  BookAlready:"Book already exists",
  queryerror:"Fail query error"
};

export const messageCommentConfig = {
  notfound:"Comment not found",
  errorUpdateComment:"Error updating Comment",
  errorCreateComment:"Error creating Comment",
  Commentalready:"Comment already exists",
  errorRepComment:"Error rep comment",
  queryerror:"Fail query error",
  donotmatch:"Do not match recipients",
};

export const messageUserConfig = {
  notfound:"User not found",
  errorUpdateUser:"Error updating User",
  errorCreateUser:"Error creating User",
  errorRetriveingUser:"Error retrieving User ",
  userAlready:"User already exists",
  faildPass: "PassWord Fail",
  queryerror:"Fail query error"
};

export const messageModelConfig = {
  alreadyExists:"đã tồn tại.",
  errorCreateIndex:"Lỗi khi tạo Index:"
};