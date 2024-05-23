import { Column, Model, PrimaryKey, Table } from "sequelize-typescript";
import InvoiceItems from "../domain/invoice_items";
import Address from "../../@shared/domain/value-object/address";

@Table({
  tableName: 'invoice',
  timestamps: false
})
export class InvoiceModel extends Model {
  @PrimaryKey
  @Column({ allowNull: false })
  id: string

  @Column({ allowNull: false })
  name: string

  @Column({ allowNull: false })
  document: string

  @Column({ allowNull: false })
  street: string

  @Column({ allowNull: false })
  number: string

  @Column({ allowNull: true })
  complement: string

  @Column({ allowNull: false })
  city: string

  @Column({ allowNull: false })
  state: string

  @Column({ allowNull: false })
  zipcode: string

  @Column({allowNull: false })
  items: InvoiceItems[]

  @Column({ allowNull: false })
  createdAt: Date

  @Column({ allowNull: false })
  updatedAt: Date
}