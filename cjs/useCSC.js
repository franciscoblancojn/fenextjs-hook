"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useCountryStateCity = exports.useCSC = void 0;
const country_state_city_nextjs_1 = require("country-state-city-nextjs");
const react_1 = require("react");
const useData_1 = require("./useData");
/**
 * Hook that provides a CSC (Country, State, City) selector functionality.
 *
 * @param {Object} useCSCProps - Object containing optional `defaultValue` prop.
 * @param {Object} useCSCProps.defaultValue - Optional object containing default CSC values.
 * @param {Object} CSCProps - Object containing optional `country`, `state`, and `city` props.
 * @param {Object} CSCProps.country - Optional object containing country data.
 * @param {Object} CSCProps.state - Optional object containing state data.
 * @param {Object} CSCProps.city - Optional object containing city data.
 *
 * @returns {Object} An object with the following properties:
 * @returns {Boolean} load - Indicates whether the CSC data has been loaded.
 * @returns {Array} countrys - Array containing all loaded country objects.
 * @returns {Array} states - Array containing all loaded state objects.
 * @returns {Array} citys - Array containing all loaded city objects.
 * @returns {Function} onChangeCSC - Function to update the CSC data.
 * @returns {Object} value - Object containing the currently selected CSC data.
 * @returns {Array} statesForCountrySelected - Array containing all loaded state objects that belong to the currently selected country.
 * @returns {Array} citysForStateSelected - Array containing all loaded city objects that belong to the currently selected state.
 */
const useCSC = ({ defaultValue = {}, onChange }) => {
    /**
     * An array of countries loaded by the hook.
     */
    const [countrys, setCountrys] = (0, react_1.useState)([]);
    const [loadCountrys, setLoadCountrys] = (0, react_1.useState)(true);
    /**
     * An array of states loaded by the hook.
     */
    const [states, setStates] = (0, react_1.useState)([]);
    const [loadStates, setLoadStates] = (0, react_1.useState)(true);
    /**
     * An array of cities loaded by the hook.
     */
    const [citys, setCitys] = (0, react_1.useState)([]);
    const [loadCitys, setLoadCitys] = (0, react_1.useState)(true);
    const onLoadCountrys = async () => {
        setLoadCountrys(false);
        const countrys = await (0, country_state_city_nextjs_1.getDataCountrys)();
        setCountrys(countrys.map((e) => {
            return {
                ...e,
                img: `${(0, country_state_city_nextjs_1.getRuteCountryImg)(e)}`,
            };
        }));
        setLoadCountrys(true);
        if (defaultValue?.country) {
            await onLoadStates(defaultValue?.country);
            if (defaultValue?.state) {
                await onLoadCitys(defaultValue?.country, defaultValue?.state);
            }
        }
    };
    const onLoadStates = async (country) => {
        setStates([]);
        setCitys([]);
        if (country) {
            setLoadStates(false);
            const states = await (0, country_state_city_nextjs_1.getDataStatesByCountry)(country);
            setStates(states);
        }
        setLoadStates(true);
    };
    const onLoadCitys = async (country, state) => {
        setCitys([]);
        if (country && state) {
            setLoadCitys(false);
            const citys = await (0, country_state_city_nextjs_1.getDataCitysByStateAndCountry)(country, state);
            setCitys(citys);
        }
        setLoadCitys(true);
    };
    /**
     * A memoized version of the `value` property returned by the `useData` hook.
     * The `onChangeData` function returned by the `useData` hook is used to
     * convert the input CSC data to the correct format.
     */
    const { data: value, onConcatData, setDataFunction, } = (0, useData_1.useData)({
        ...defaultValue,
        ...(defaultValue?.country
            ? {
                ...defaultValue?.country,
                img: `${(0, country_state_city_nextjs_1.getRuteCountryImg)(defaultValue?.country)}`,
            }
            : {}),
    }, {
        onChangeDataAfter: onChange,
    });
    const onChangeCSC = (id) => (value) => {
        if (id == "country") {
            onConcatData({
                country: value,
                state: undefined,
                city: undefined,
            });
            onLoadStates(value);
        }
        if (id == "state") {
            setDataFunction((old) => {
                if (old?.country) {
                    onLoadCitys(old?.country, value);
                    return {
                        ...old,
                        state: value,
                        city: undefined,
                    };
                }
                return old;
            });
        }
        if (id == "city") {
            setDataFunction((old) => {
                if (old?.country && old?.state) {
                    return {
                        ...old,
                        city: value,
                    };
                }
                return old;
            });
        }
    };
    /**
     * Loads the countries, states and cities asynchronously.
     */
    (0, react_1.useEffect)(() => {
        onLoadCountrys();
    }, []);
    return {
        countrys,
        states,
        citys,
        onChangeCSC,
        value,
        loadCountrys,
        loadStates,
        loadCitys,
    };
};
exports.useCSC = useCSC;
exports.useCountryStateCity = exports.useCSC;
//# sourceMappingURL=useCSC.js.map