import { LightningElement, api, track, wire } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { fireEvent } from 'c/pubsub';
import { NavigationMixin, CurrentPageReference } from 'lightning/navigation';

import PRICE_FIELD from '@salesforce/schema/Property__c.Price__c';
import STATUS_FIELD from '@salesforce/schema/Property__c.Status__c';
import BEDS_FIELD from '@salesforce/schema/Property__c.Beds__c';
import BROKER_FIELD from '@salesforce/schema/Property__c.Broker__c';
import BATHS_FIELD from '@salesforce/schema/Property__c.Baths__c';

export default class RelatedProperty extends LightningElement {
    @api item;
    @track propertyFields = [PRICE_FIELD, BEDS_FIELD, BATHS_FIELD, STATUS_FIELD, BROKER_FIELD];

    @wire(CurrentPageReference) pageRef;

    navigateToRecord() {
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: this.theitem.Id,
                objectApiName: 'Property__c',
                actionName: 'view',
            },
        });
    }

    fireToast() {
        const evt = new ShowToastEvent({
            title: "Success!",
            message: "The record has been successfully saved.",
            variant: "success",
        });
        this.dispatchEvent(evt);
        fireEvent(this.pageRef, 'propertyUpdated', this);
    }
}