import axios from "axios";

import { useState, useRef } from 'react'
import { useGetUserId } from "../hooks/useGetUserId";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faX, faPlus, faSort } from '@fortawesome/free-solid-svg-icons'

import "../stylesheets/admin_services.scss";


const AdminAddService = () => {

    const userId = useGetUserId();

    const [perks, setPerks] = useState([]);
    const [newPerk, setNewPerk] = useState("");
    const dragPerk = useRef();
    const dragOverPerk = useRef();

    const [service, setService] = useState({
        createdBy: userId,
        title: "",
        description: "",
        price: "",
        perks: perks
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setService({...service, [name]:value});
    }

    const handleAddPerk = () => {
        setPerks(p => [...p, newPerk]);
    }

    const handleChangePerk = (e) => {
        setNewPerk(e.target.value);
    }

    const handleDeletePerk = (key) => {
        setPerks(p => p.filter((_, index) => index !== key));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(perks);
        /*try{
            await axios.post(`${import.meta.env.VITE_BASE_URI}/content/AddService`, {...service});
        }catch(err){
            console.log(err);
        }*/
    }

    const dragStart = (e) => {
        dragPerk.current = e.target.id;
        console.log("drag start");
    }

    const dragEnter = (e) => {
        dragOverPerk.current = e.currentTarget.id;
        console.log("drag enter");
    }

    const dragEnd = () => {
        const copyPerks = [...perks];
        const dragPerkContent = copyPerks[dragPerk.current];
        copyPerks.splice(dragPerk.current, 1);
        copyPerks.splice(dragOverPerk.current, 0, dragPerkContent);
        dragPerk.current = null;
        dragOverPerk.current = null;
        console.log(copyPerks);
        setPerks(copyPerks);
        console.log("drag end")
    }

  return (
    <div className="formPageContent">
        <h1>Add Service</h1>
        <form onSubmit={handleSubmit}>
            <div className="formGroup">
                <label htmlFor="title">Title: </label>
                <input type="text" name="title" id="title"  onChange={handleChange}/>
            </div>
            <div className="formGroup">
                <label htmlFor="description">Description: </label>
                <input type="text" name="description" id="description"  onChange={handleChange}/>
            </div>
            <div className="formGroup">
                <label htmlFor="price">Price: <small>(Blank or 0 will display "Contact for price")</small> </label>
                <input type="number" name="price" id="price"  onChange={handleChange}/>
            </div>
            <div className="formGroup">
                <label htmlFor="perk">Perks:</label>
                <div className="perkInput">
                    <input type="text" name="perk" id="perk" value={newPerk} onChange={handleChangePerk}/>
                    <button className="addPerkBtn" onClick={handleAddPerk}><FontAwesomeIcon icon={faPlus}/></button>
                </div>
                <ul className="addedPerksList">
                {perks.map((perk, key)=>(
                    <li key={key} draggable onDragStart={(e) => dragStart(e)} onDragEnter={(e) => dragEnter(e)} onDragEnd={dragEnd}>
                        <button className = "sortPerkBtn">
                            <small><FontAwesomeIcon icon={faSort} /></small>
                        </button>
                        {perk}
                        <button className = "deletePerkBtn" onClick={() => handleDeletePerk(key)}>
                            <small><FontAwesomeIcon icon={faX} /></small>
                        </button>
                    </li>
                ))}
                </ul>
            </div>
                
            <div className="formGroup">
                <button type="submit" className="submitBtn">Add Service</button>
            </div>
        </form>
    </div>
  )
}

export default AdminAddService