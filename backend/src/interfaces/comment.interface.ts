export interface Rep {
  id: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  idUserRep:string
}

export interface Comment {
  id: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  idUser:string;
  replies: Rep[];
}
