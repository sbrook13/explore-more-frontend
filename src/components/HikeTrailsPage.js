import React from 'react'
import TrailCard from './TrailCard'
import TrailSpecs from './TrailSpecs'

export default function HikeTrailsPage(props) {

  const { 
    saveToList,
    addToFavorites,
    addToCompleted,
    addToBucketList,
    allTrails, 
    filteredTrailList, 
    filterTrails, 
    selectTrail, 
    selectedTrail, 
    showAllTrails, 
    type,
    user
  } = props

  const displayTrailCards = () => {
    return allTrails.map(trail => {
      return <TrailCard trail={trail} selectTrail={selectTrail}/>
    })
  }

  const displayTrailSpecs = () => {
    const trail = selectedTrail
    return <TrailSpecs 
      trail={trail}
      saveToList={saveToList}
      addToCompleted={addToCompleted} 
      addToBucketList={addToBucketList} 
      addToFavorites={addToFavorites}
      showAllTrails={showAllTrails}
      type={type}
      user={user}
    />
  }

  const handleChange = (event) => {
    console.log(event.target.input)
  }

  return (
    <div className="flex-row-container">
      <form>
        <label>Seach Trails By Name:</label>
        <input type="text" onChange={event => handleChange(event)}/>
      </form>
      <div className="trails-section">
        {selectedTrail ? displayTrailSpecs() : displayTrailCards()}
      </div>
    </div>
  )
}
