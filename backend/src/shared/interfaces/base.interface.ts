export interface IBaseRepository<T> {
    findById(id: string): Promise<T | null>;
    findAll(): Promise<T[]>;
    create(data: Partial<T>): Promise<T>;
    update(id: string, data: Partial<T>): Promise<T | null>;
    delete(id: string): Promise<boolean>;
}

export interface IBaseService<T, DTO> {
    getById(id: string): Promise<DTO | null>;
    getAll(): Promise<DTO[]>;
    create(data: Partial<T>): Promise<DTO>;
    update(id: string, data: Partial<T>): Promise<DTO | null>;
    delete(id: string): Promise<boolean>;
}
