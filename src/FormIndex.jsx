import React, { Component, createRef } from 'react'
import FormSinhVien from './FormSinhVien'

export default class FormIndex extends Component {

    constructor(props){
        super(props);
        this.childRef = createRef();
        this.state = {
            arrSinhVien: [],
    
            svEdit:{
                maSV:'',
                soDienThoai:'' ,
                hoTen:'',
                email:'' , 
            }
        }
    }

   


    themSV = (svClick) =>{
        
        let  newSV =[...this.state.arrSinhVien];
        newSV.push({...svClick});

        this.setState({
            arrSinhVien:newSV
        })
    }
    xoaSV =(idSV)=>{
         let indexDel = this.state.arrSinhVien.findIndex(item=>item.maSV===idSV)
       if(indexDel !==-1){
        this.state.arrSinhVien.splice(indexDel,1);
        this.setState({
            arrSinhVien:this.state.arrSinhVien
        })
       }
    }
    editSV = (svClick)=>{
        this.childRef.current.setState({
            value:svClick
        })
        }
    updateSV=(svEdit)=>{
             svEdit = {...svEdit};
           let svInArray = this.state.arrSinhVien.find(sv=>sv.maSV===svEdit.maSV);
           if(svInArray){
            for(let key in svInArray ){
                svInArray[key]=svEdit[key];
            }
            this.setState({
                arrSinhVien:this.state.arrSinhVien
            })
           }
    }   
    

    renderTable = () => {
        return this.state.arrSinhVien.map((item) => {
            return <tr key={item.id}>
                <td>{item.maSV}</td>
                <td>{item.hoTen}</td>
                <td>{item.soDienThoai}</td>
                <td>{item.email}</td>
                <td>
                    <button className='btn btn-danger mx-2' onClick={()=>{
                        this.xoaSV(item.maSV)
                    }}>
                    <i className="fa fa-trash-alt"></i>
                    </button>
                    <button className='btn btn-primary'  onClick={(e)=>{
                        this.editSV(item);
                       
                    }}>
                    <i className="fa fa-wrench"></i>
                    </button>
                </td>
            </tr>
        })
    }

    


    render() {
        return (
            <div className='container'>
                <FormSinhVien ref={this.childRef} themSV={this.themSV} arrSinhVien={this.state.arrSinhVien} svEdit={this.state.svEdit} updateSV={this.updateSV} />
                <table className='container w-75 table'>
                    <thead>
                        <tr className='bg-success'>
                            <td className='bg-success'>MÃ SINH VIÊN</td>
                            <td className='bg-success'>HỌ VÀ TÊN</td>
                            <td className='bg-success'>SỐ ĐIỆN THOẠI</td>
                            <td className='bg-success'>EMAIL</td>
                            <td className='bg-success'></td>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderTable()}
                    </tbody>
                </table>

            </div>
        )

    }
}
