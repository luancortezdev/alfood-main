// Esse <T> (Generics) indica que essa IPaginacao será a interface de outra interface.
export interface IPaginacao<T> {
    count: number
    next: string
    previous: string
    results: T[]
}