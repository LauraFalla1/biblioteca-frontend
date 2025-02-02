import { Component, OnInit } from '@angular/core'
import { UserFormService } from '../../services/userform.service'
import { UserForm } from 'src/app/core/models/user-form'
import { GenderType } from 'src/app/core/models/gender-type'
import { TuiContextWithImplicit, TuiStringHandler, tuiPure } from '@taiga-ui/cdk'

@Component({
	selector: 'app-userForm-list',
	templateUrl: './userForm-list.component.html',
	styleUrls: ['./userForm-list.component.scss'],
})
export class UserFormListComponent implements OnInit {
	isOpenFailDialog = false
	isOpenPassDialog = false
	private changedItems = new Set<UserForm>()

	readonly columns = [
		'id',
		'index',
		'userUsername',
		'firstName',
		'lastName',
		'middleName',
		'birthday',
		'address',
		'phoneNumber',
		'email',
		'registrationDate',
		'debt',
		'genderType',
		'actions',
	]

	genders: { name: string; value: GenderType }[] = [
		{ name: 'Masculino', value: GenderType.MALE },
		{ name: 'Femenino', value: GenderType.FEMALE },
	]

	get data(): UserForm[] {
		return this.userFormService.list
	}

	isChangeItem(userForm: UserForm) {
		return this.changedItems.has(userForm)
	}

	onValueChange(userForm: UserForm) {
		this.changedItems.add(userForm)
	}

	constructor(public userFormService: UserFormService) { }

	ngOnInit(): void {
		this.userFormService.receiveData()
	}

	save(item: UserForm) {
		this.userFormService.clearForm()
		this.userFormService.add(item)
		this.changedItems.delete(item)
	}

	update(item: UserForm) {
		this.userFormService.objectToForm(item)
		this.userFormService.isOpenDialog = true
		this.userFormService.isCreateDialog = false
	}

	delete(item: UserForm) {
		if (item.id !== undefined) this.userFormService.delete(item.id)
	}

	getGenderName(gender: GenderType | undefined) {
		return this.genders.find((e) => gender?.toString() == e.value.toString())?.name || ''
	}
}
