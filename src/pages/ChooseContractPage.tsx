import React, { Component, ChangeEvent } from 'react';
import '../styles/pages/ChooseContractPage.css';

interface Activity {
  id: number;
  name: string;
}

interface ContractType {
  id: number;
  name: string;
  description: string;
}

interface State {
  selectedActivity: string;
  selectedContractType: string;
  payante: boolean;
}

class ChooseContractPage extends Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = {
      selectedActivity: '',
      selectedContractType: '',
      payante: false,
    };
  }

  handleActivityChange = (event: ChangeEvent<HTMLSelectElement>) => {
    this.setState({ selectedActivity: event.target.value });
  };

  handleContractTypeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    this.setState({ selectedContractType: event.target.value });
  };

  handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  render() {
    const activities: Activity[] = [
      { id: 1, name: 'Activité 1' },
      { id: 2, name: 'Activité 2' },
      { id: 3, name: 'Activité 3' },
    ];

    const contractTypes: ContractType[] = [
      { id: 1, name: 'Mise en avant', description: 'Description de la mise en avant' },
      { id: 2, name: 'Paiement par Clients', description: 'Description du paiement par clients' },
    ];

    const { selectedActivity, selectedContractType } = this.state;

    return (
      <div className="ChooseContract-form-container">
        <div className="ChooseContract-centered-row">
          <h2 className="ChooseContract-form-title">Choisir un contrat</h2>
        </div>
        <div className="ChooseContract-row">
          <label className="ChooseContract-label-column_20">
            Activité concernée:
          </label>
          <label className="ChooseContract-column_75">
            <select value={selectedActivity} onChange={this.handleActivityChange} className='ChooseContract-text-red'>
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
          <div className="ChooseContract-row">
            <label className="ChooseContract-label-column_20">
              Type de contrat:
            </label>
            <label className="ChooseContract-column_30">
              <select value={selectedContractType} onChange={this.handleContractTypeChange} className='ChooseContract-text-red'>
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
            <div className="ChooseContract-separator"></div>
            <div className="ChooseContract-row">
              <label className="ChooseContract-label-column_20">Description du contrat :</label>
              <label className="ChooseContract-column_75">{contractTypes.find((c) => c.name === selectedContractType)?.description}</label>
            </div>
            <div className="ChooseContract-separator"></div>
            <form>
              <div className="ChooseContract-row">
                <label className="ChooseContract-label-column_20">
                  Nom du Detenteur:
                </label>
                <label className="ChooseContract-column_75">
                  <input type="text" name="cardHolderName" className='ChooseContract-text-red' />
                </label>
              </div>
              <br />
              <div className="ChooseContract-row">
                <label className="ChooseContract-label-column_20">
                  Numéro de la carte de crédit:
                </label>
                <label className="ChooseContract-column_75">
                  <input type="text" name="cardNumber" className='ChooseContract-text-red' />
                </label>
              </div>
              <br />
              <div className="ChooseContract-row">
                <div className="ChooseContract-row">
                  <label className="ChooseContract-label-column_40">
                    Date d'expiration:
                  </label>
                  <label className="ChooseContract-column_50">
                    <input type="text" name="expirationDate" className='ChooseContract-text-red' />
                  </label>
                </div>
                <div className="ChooseContract-row">
                  <label className="ChooseContract-label-right-column_40">
                    CVV:
                  </label>
                  <label className="ChooseContract-column_50">
                    <input type="text" name="cvv" className='ChooseContract-text-red' />
                  </label>
                </div>
              </div>
              <div className="ChooseContract-row">
                <div className="ChooseContract-row"></div>
                <div className="ChooseContract-row">
                  <label className="ChooseContract-label-right-column_40"></label>
                  {/* checkBox termes */}
                  <label className="ChooseContract-column_5">
                    <input
                      type="checkbox"
                      name="accepte_contrat"
                      checked={this.state.payante}
                      onChange={this.handleInputChange}
                    />

                  </label>
                  {/* checkBox termes */}
                  <label className="ChooseContract-label-column_50">
                    J'accepte les termes du contrat
                  </label>
                </div>
              </div>
              <br />
              <div className="ChooseContract-centered-row">
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
