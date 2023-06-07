import React from 'react';
import '../styles/pages/ChooseContractPage.css';

class ChooseContractPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedActivity: '',
      selectedContractType: '',
    };
  }

  handleActivityChange = (event) => {
    this.setState({ selectedActivity: event.target.value });
  };

  handleContractTypeChange = (event) => {
    this.setState({ selectedContractType: event.target.value });
  };

  render() {
    const activities = [
      { id: 1, name: 'Activité 1' },
      { id: 2, name: 'Activité 2' },
      { id: 3, name: 'Activité 3' },
    ];

    const contractTypes = [
      { id: 1, name: 'Mise en avant', description: 'Description de la mise en avant' },
      { id: 2, name: 'Paiement par Clients', description: 'Description du paiement par clients' },
    ];

    const { selectedActivity, selectedContractType } = this.state;

    return (
      <div className="form-container">
        <h2 className="form-title">Choisir un contrat</h2>
        <div className="form-row">
          <label className="column_20">
            Activité concernée:
          </label>
          <label className="column_75">
            <select value={selectedActivity} onChange={this.handleActivityChange} className='text-orange'>
              <option value="">Sélectionnez une activité</option>
              {activities.map((activity) => (
                <option key={activity.id} value={activity.name}>
                  {activity.name}
                </option>
              ))}
            </select>
          </label>
        </div>
        {selectedActivity && (
          <div className="form-row">
            <label className="column_20">
              Type de contrat:
            </label>
            <label className="column_30">
              <select value={selectedContractType} onChange={this.handleContractTypeChange} className='text-orange'>
                <option value="">Sélectionnez un type de contrat</option>
                {contractTypes.map((contractType) => (
                  <option key={contractType.id} value={contractType.name}>
                    {contractType.name}
                  </option>
                ))}
              </select>
            </label>
          </div>
        )}
        {selectedContractType && (
          <div>
            <div className="form-row">
              <label className="column_20">Description du contrat :</label>
              <label className="column_75">{contractTypes.find((c) => c.name === selectedContractType).description}</label>
            </div>
            <div className="separator"></div>
            <form>
              <div className="form-row">
                <label className="column_20">
                  Nom du possesseur de la carte de crédit:
                </label>
                <label className="column_75">
                  <input type="text" name="cardHolderName" className='text-orange' />
                </label>
              </div>
              <br />
              <div className="form-row">
                <label className="column_20">
                  Numéro de la carte de crédit:
                </label>
                <label className="column_75">
                  <input type="text" name="cardNumber" className='text-orange' />
                </label>
              </div>
              <br />
              <div className="form-row">
                <label className="column_20">
                  Date d'expiration:
                </label>
                <label className="column_25">
                  <input type="text" name="expirationDate" className='text-orange' />
                </label>
                <label className="column_10"></label>
                <label className="column_15">
                  CVV:
                </label>
                <label className="column_25">
                  <input type="text" name="cvv" className='text-orange' />
                </label>
              </div>
              <br />
              <div className="center-button">
                <button type="submit">Valider</button>
              </div>
            </form>
          </div>
        )}
      </div>
    );
  }
}

export default ChooseContractPage;
