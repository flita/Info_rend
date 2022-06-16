import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Orders } from './Orders';

@Entity()
export class Cart {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    price: number;
    
    @Column()
    preparation: number;
    
    @Column()
    uploaderId: number;
}