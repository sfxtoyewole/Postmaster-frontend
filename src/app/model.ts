export interface BlogPost {
  id: number;
  content: string;
  likes: number;
  title: string;
  imageBase64Url?: string;
  comments?: number;
}

export interface DataTableResp<T> {
  hasNext: boolean;
  data: T[];
}

export interface ApiResp<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface SignInReq {
  username: string;
  password: string;
}

export interface SignUpReq extends SignInReq {
  email: string;
}

export interface comment {
  text: string;
  author: string;
  createdAt: Date;
}
