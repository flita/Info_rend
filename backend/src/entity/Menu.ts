import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class AddMenu {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'text', nullable: true })
    foodName: string;

    @Column({ nullable: true })
    imgUrl: string;
    
    @Column({ nullable: true })
    category: string; /*Category[];*/
    
    @Column({ type: 'text', nullable: true })
    description: string;
    
    @Column({ type: 'int'})
    price: number;
    
    @Column({ type: 'int'})
    preparation: number;
}