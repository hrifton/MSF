'use strict';


customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">MSF documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                        <li class="link">
                            <a href="dependencies.html" data-type="chapter-link">
                                <span class="icon ion-ios-list"></span>Dependencies
                            </a>
                        </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse" ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link">AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppModule-6549b4fd59fa8680eb4191e427106a58"' : 'data-target="#xs-components-links-module-AppModule-6549b4fd59fa8680eb4191e427106a58"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-6549b4fd59fa8680eb4191e427106a58"' :
                                            'id="xs-components-links-module-AppModule-6549b4fd59fa8680eb4191e427106a58"' }>
                                            <li class="link">
                                                <a href="components/AppComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AppComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CorpsDeMetierComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">CorpsDeMetierComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DepartementComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DepartementComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FormulaireInterventionComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">FormulaireInterventionComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ListeCorpMetierComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ListeCorpMetierComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ListeDepartementComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ListeDepartementComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ListeInterventionComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ListeInterventionComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NavBarComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">NavBarComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SettingDepartementComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SettingDepartementComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SettingMetierComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SettingMetierComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SettingTechnicienComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SettingTechnicienComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TechnicienComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TechnicienComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link">AppRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/InterventionsModule.html" data-type="entity-link">InterventionsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-InterventionsModule-c6975b3b5794a0abd13c04f76460ff08"' : 'data-target="#xs-components-links-module-InterventionsModule-c6975b3b5794a0abd13c04f76460ff08"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-InterventionsModule-c6975b3b5794a0abd13c04f76460ff08"' :
                                            'id="xs-components-links-module-InterventionsModule-c6975b3b5794a0abd13c04f76460ff08"' }>
                                            <li class="link">
                                                <a href="components/HistoricInterventionComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">HistoricInterventionComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/InterventionsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">InterventionsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ListInterventionComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ListInterventionComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ResolutionInterventionComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ResolutionInterventionComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/InterventionsRoutingModule.html" data-type="entity-link">InterventionsRoutingModule</a>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#components-links"' :
                            'data-target="#xs-components-links"' }>
                            <span class="icon ion-md-cog"></span>
                            <span>Components</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links"' : 'id="xs-components-links"' }>
                            <li class="link">
                                <a href="components/FormulaireInterventionComponent-1.html" data-type="entity-link">FormulaireInterventionComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/InterventionComponent.html" data-type="entity-link">InterventionComponent</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse" ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/AppPage.html" data-type="entity-link">AppPage</a>
                            </li>
                            <li class="link">
                                <a href="classes/Departement.html" data-type="entity-link">Departement</a>
                            </li>
                            <li class="link">
                                <a href="classes/Departement-1.html" data-type="entity-link">Departement</a>
                            </li>
                            <li class="link">
                                <a href="classes/Intervention.html" data-type="entity-link">Intervention</a>
                            </li>
                            <li class="link">
                                <a href="classes/Intervention-1.html" data-type="entity-link">Intervention</a>
                            </li>
                            <li class="link">
                                <a href="classes/Metier.html" data-type="entity-link">Metier</a>
                            </li>
                            <li class="link">
                                <a href="classes/Technicien.html" data-type="entity-link">Technicien</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/DepartementService.html" data-type="entity-link">DepartementService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DepartementService-1.html" data-type="entity-link">DepartementService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/InterventionService.html" data-type="entity-link">InterventionService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/InterventionService-1.html" data-type="entity-link">InterventionService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MetierService.html" data-type="entity-link">MetierService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TechnicienService.html" data-type="entity-link">TechnicienService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse" ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/IOrderModel.html" data-type="entity-link">IOrderModel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IOrderModel-1.html" data-type="entity-link">IOrderModel</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse" ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});