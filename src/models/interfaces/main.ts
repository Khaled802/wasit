export interface ModelList {
  create(body: any): Promise<any>;
  get_all(): Promise<any[]>;
}

export interface ModelObject {
  is_found(): Promise<boolean>;
  get(): Promise<any>;
  update(body: any): Promise<any>;
  delete(): Promise<any>;
}
