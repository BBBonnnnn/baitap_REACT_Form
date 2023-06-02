import React, { Component } from 'react'

export default class FormSinhVien extends Component {

    state = {
        value: {
            maSV: '',
            soDienThoai: '',
            hoTen: '',
            email: '',
        },
        errors: {
            maSV: '(*)',
            soDienThoai: '(*)',
            hoTen: '(*)',
            email: '(*)',
        },
        inValid: true,
    }


    layThongTin = (e) => {
        const { arrSinhVien } = this.props;
        let { value, id } = e.target;
        // values
        let newValues = { ...this.state.value };
        newValues[id] = value;
        // errors
        let messageError = '';
        let dataType = e.target.getAttribute('data-type');
        let dataLength = e.target.getAttribute('data-length');
        if (value.trim() === '') {
            messageError = id + ` không để trống!!`;
        } else {
            if (id === 'maSV') {
                for (let key of arrSinhVien) {
                    if (key.maSV === value) {
                        messageError = 'trùng mã Sinh Viên !!!!'
                    }
                }
            }
            switch (dataType) {
                case 'number': {
                    const regexNumber = /^[0-9]+$/;
                    if (!regexNumber.test(value)) {
                        messageError = id + ` chỉ nhập số!!`
                    }
                } break;
                case 'email': {
                    const regexEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
                    if (!regexEmail.test(value)) {
                        messageError = id + ` phải đúng format !!!`
                    }
                } break;
                case 'letter': {
                    const regexLetter = /^[A-Z a-záàạảãăặẵẳằắ]+$/;;
                    if (!regexLetter.test(value)) {
                        messageError = id + ` chỉ nhập chữ !!!`
                    }
                } break;
            }
            if (dataLength) {
                let [min, max] = JSON.parse(dataLength);
                if (value.length < min || value.length > max) {
                    messageError = id + ` từ ${min} đến ${max}`;
                }
            }
        }

        let newErrors = { ...this.state.errors };
        newErrors[id] = messageError;

        let checkValid = (errors) => {
            let output = false;
            for (let key in errors) {
                if (errors[key] !== '') {
                    output = true;
                }

            }
            return output
        }
        this.setState({
            value: newValues,
            errors: newErrors,
            inValid: checkValid(newErrors),
        },
        )

    }


    render() {
        const { themSV } = this.props;
        return (
            <div className='container w-75'>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    themSV(this.state.value);
                    console.log('xxxx',e)
                    // e.target.input.value = ''
                    
                }}>
                    <h1 className='text-center bg-dark text-light'>Thông tin sinh viên</h1>
                    <div className='row'>
                        <div className='col-6'>
                            <p className='text-center'>MÃ SINH VIÊN</p>
                            <input value={this.state.value.maSV} data-type='number' data-length='[2,6]' id='maSV' className='form-control' onInput={this.layThongTin} />
                            <p className='text text-danger'>{this.state.errors.maSV}</p>
                        </div>
                        <div className='col-6'>
                            <p className='text-center'>HỌ TÊN</p>
                            <input value={this.state.value.hoTen} data-type='letter' id='hoTen' className='form-control' onInput={this.layThongTin}
                            />
                            <p className='text text-danger'>{this.state.errors.hoTen}</p>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-6'>
                            <p className='text-center'>SỐ ĐIỆN THOẠI</p>
                            <input value={this.state.value.soDienThoai} data-type='number' id='soDienThoai' className='form-control' onInput={this.layThongTin} />
                            <p className='text text-danger'>{this.state.errors.soDienThoai}</p>
                        </div>
                        <div className='col-6'>
                            <p className='text-center'>EMAIL</p>
                            <input value={this.state.value.email} data-type='email' id='email' className='form-control' onInput={this.layThongTin} />
                            <p className='text text-danger'>{this.state.errors.email}</p>
                        </div>
                    </div>

                    <button className='btn btn-success my-4' type='submit' disabled={this.state.inValid}>Thêm sinh viên</button>
                    <button className='btn btn-primary my-4 mx-3' onClick={() => {
                    this.props.updateSV(this.state.value);
                }}>Chỉnh sửa</button>
                </form>
                
            </div>
        )
    }
}


