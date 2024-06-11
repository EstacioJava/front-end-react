import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogHeader, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

interface NewClientDialogProps {
   isAddClientDialogOpen: boolean;
   setIsAddClientDialogOpen: Dispatch<SetStateAction<boolean>>;
}

// name
// cpf
// email
// phone
// address

// Rua Menino Deus, 173 - Centro, Florianópolis - SC, 88020-210
// Rua: Rua Menino Deus
// Número: 173 
// Complemento: 
// Bairro: Centro
// Cidade: Florianópolis 
// Estado: SC
// CEP: 88020-210

export default function NewClientDialog({ isAddClientDialogOpen, setIsAddClientDialogOpen }: NewClientDialogProps) {
   const STATES = {
      '12': 'AC',
      '27': 'AL',
      '16': 'AP',
      '13': 'AM',
      '29': 'BA',
      '23': 'CE',
      '53': 'DF',
      '32': 'ES',
      '52': 'GO',
      '21': 'MA',
      '51': 'MT',
      '50': 'MS',
      '31': 'MG',
      '15': 'PA',
      '25': 'PB',
      '41': 'PR',
      '26': 'PE',
      '22': 'PI',
      '33': 'RJ',
      '24': 'RN',
      '43': 'RS',
      '11': 'RO',
      '14': 'RR',
      '42': 'SC',
      '35': 'SP',
      '28': 'SE',
      '17': 'TO',
   }

   const [name, setName] = useState('');
   const [cpf, setCpf] = useState('');
   const [email, setEmail] = useState('');
   const [phone, setPhone] = useState('');
   const [address, setAddress] = useState('');

   const [addressState, setAddressState] = useState('42');
   const [street, setStreet] = useState('');
   const [addressNumber, setAddressNumber] = useState('');
   const [complement, setComplement] = useState('');
   const [neighborhood, setNeighborhood] = useState('');
   const [city, setCity] = useState('');
   const [postalCode, setPostalCode] = useState('');
   
   const [IBGEDistricts, setIBGEDistricts] = useState([]);
   const [isCitiesPopoverOpen, setIsCitiesPopoverOpen] = useState(false);
   const [filteredCities, setFilteredCities] = useState([]);
   
   const [citySearchValue, setCitySearchValue] = useState('');
   const [searchingCities, setSearchingCities] = useState(false);
   const [searchCitiesDebounce, setSearchCitiesDebounce] = useState<any>(null);

   function searchCities () {
      if (searchCitiesDebounce) {
         clearTimeout(searchCitiesDebounce);
      }

      setSearchingCities(true);
      setSearchCitiesDebounce(setTimeout(() => {
         console.log('Filtering cities...');
         
         if (IBGEDistricts.length > 0) {
            setFilteredCities(IBGEDistricts.filter(({ label }) => label.match(new RegExp(citySearchValue, 'gi'))))
         }
         setSearchingCities(false);
      }, 1000));
   }

   function submitClient () {
      fetch(`http://localhost:8080/clients`, {
         method: 'POST',
         body: JSON.stringify({
               name: name,
               cpf: cpf,
               email: email,
               phone: phone,
               address: address
         })
      })
      .then(response => response.json())
      .then(data => {
         console.log('New client', data);
         window.location.reload();
      })
   }

   useEffect(() => {
      if (addressState) {
         fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${addressState}/distritos?orderBy=nome`)
            .then(response => response.json())
            .then(data => {
               setIBGEDistricts(data.map((district: any) => ({
                  label: district.nome,
                  value: district.id
               })));
            })
         }
   }, [addressState])

   useEffect(() => {
      if (isCitiesPopoverOpen) {
         searchCities();
      }
   }, [isCitiesPopoverOpen, citySearchValue]);

   useEffect(() => {
      setAddress(`Address: ${ street }, ${ addressNumber } - ${ neighborhood }, ${ city } - ${ STATES[addressState] }, ${ postalCode }`);
   }, [addressState, street, addressNumber, complement, neighborhood, city, postalCode]);

   return (
      <Dialog onOpenChange={(v) => setIsAddClientDialogOpen(v)} open={isAddClientDialogOpen}>
         <DialogContent className="max-w-[50rem]" onPointerDownOutside={() => setIsAddClientDialogOpen(false)}>
            <DialogHeader>
               <DialogTitle className="text-2xl font-semibold">Novo cliente</DialogTitle>
            </DialogHeader>

            <div className="grid grid-cols-2 gap-3 mb-3">
               <div>
                  <Label>Nome</Label>
                  <Input onChange={({ target }) => setName(target.value)} type="text" />
               </div>

               <div>
                  <Label>CPF</Label>
                  <Input onChange={({ target }) => setCpf(target.value)} type="text" />
               </div>

               <div>
                  <Label>E-mail</Label>
                  <Input onChange={({ target }) => setEmail(target.value)} type="text" />
               </div>

               <div>
                  <Label>Telefone</Label>
                  <Input onChange={({ target }) => setPhone(target.value)} type="text" />
               </div>
            </div>

            <div className="grid grid-cols-5 gap-3">
               <h2 className="text-xl font-semibold col-span-full">Endereço</h2>

               <div className="col-span-3">
                  <Label>Rua <i title="Obrigatório" className="ti ti-asterisk cursor-help text-primary text-xs/none px-1" /></Label>
                  <Input onChange={({ target }) => setStreet(target.value)} type="text" />
               </div>

               <div>
                  <Label>Número <i title="Obrigatório" className="ti ti-asterisk cursor-help text-primary text-xs/none px-1" /></Label>
                  <Input onChange={({ target }) => setAddressNumber(target.value)} type="number" />
               </div>

               <div>
                  <Label>Complemento</Label>
                  <Input onChange={({ target }) => setComplement(target.value)} type="text" />
               </div>

               <div className="col-span-2">
                  <Label>
                     Estado <i title="Obrigatório" className="ti ti-asterisk cursor-help text-primary text-xs/none px-1" />
                  </Label>
                  {/* Rua, Número - (Complemento) - Bairro, Cidade - Estado, CEP */}

                  <Select defaultValue="42" onValueChange={(v) => setAddressState(v)}>
                     <SelectTrigger className="w-full mt-1">
                        <SelectValue className="text-base" placeholder="Selecione um estado" />
                     </SelectTrigger>
                     <SelectContent>
                        <SelectItem value="12">AC - Acre</SelectItem>
                        <SelectItem value="27">AL - Alagoas</SelectItem>
                        <SelectItem value="16">AP - Amapá</SelectItem>
                        <SelectItem value="13">AM - Amazonas</SelectItem>
                        <SelectItem value="29">BA - Bahia</SelectItem>
                        <SelectItem value="23">CE - Ceará</SelectItem>
                        <SelectItem value="53">DF - Distrito Federal</SelectItem>
                        <SelectItem value="32">ES - Espírito Santo</SelectItem>
                        <SelectItem value="52">GO - Goiás</SelectItem>
                        <SelectItem value="21">MA - Maranhão</SelectItem>
                        <SelectItem value="51">MT - Mato Grosso</SelectItem>
                        <SelectItem value="50">MS - Mato Grosso do Sul</SelectItem>
                        <SelectItem value="31">MG - Minas Gerais</SelectItem>
                        <SelectItem value="15">PA - Pará</SelectItem>
                        <SelectItem value="25">PB - Paraíba</SelectItem>
                        <SelectItem value="41">PR - Paraná</SelectItem>
                        <SelectItem value="26">PE - Pernambuco</SelectItem>
                        <SelectItem value="22">PI - Piauí</SelectItem>
                        <SelectItem value="33">RJ - Rio de Janeiro</SelectItem>
                        <SelectItem value="24">RN - Rio Grande do Norte</SelectItem>
                        <SelectItem value="43">RS - Rio Grande do Sul</SelectItem>
                        <SelectItem value="11">RO - Rondônia</SelectItem>
                        <SelectItem value="14">RR - Roraima</SelectItem>
                        <SelectItem value="42">SC - Santa Catarina</SelectItem>
                        <SelectItem value="35">SP - São Paulo</SelectItem>
                        <SelectItem value="28">SE - Sergipe</SelectItem>
                        <SelectItem value="17">TO - Tocantins</SelectItem>
                     </SelectContent>
                  </Select>
               </div>

               <div title={addressState === '' ? 'Estado é obrigatório' : ''}>
                  <Label data-locked={addressState === ''} className="data-[locked=true]:cursor-not-allowed data-[locked=true]:text-muted-foreground">
                     Cidade { searchingCities } <i title="Obrigatório" className="ti ti-asterisk cursor-help text-primary text-xs/none px-1" />
                  </Label>
                  <Input title={citySearchValue} value={citySearchValue} onFocus={() => setIsCitiesPopoverOpen(true)} disabled={addressState === ''} onChange={({ target }) => setCitySearchValue(target.value)} className="mt-1" type="text" />

                  <Popover modal={true} open={isCitiesPopoverOpen}>
                     <PopoverTrigger className="invisible"></PopoverTrigger>
                     <PopoverContent onPointerDownOutside={() => setIsCitiesPopoverOpen(false)} onOpenAutoFocus={(evt) => evt.preventDefault()} align="start" className="max-w-[16rem] max-h-[8rem] -mt-3 overflow-x-auto pointer-events-auto p-1">
                        { 
                           searchingCities
                           ? <p className="px-4 py-2 text-sm font-medium animate-pulse">
                              <i className="ti ti-loader-2 inline-flex text-base animate-spin mr-2" />
                              Procurando cidades...
                           </p>
                           : filteredCities.length > 0
                              ? filteredCities.map(({ label, value }) => <Button onClick={() => { setCitySearchValue(label); setIsCitiesPopoverOpen(false); setCity(label); }} key={value} variant="ghost" className="w-full justify-start">{ label }</Button>) 
                              : <Button onClick={() => setIsCitiesPopoverOpen(false)} variant="ghost" className="w-full justify-start">Cidade não encontrada</Button>
                        }
                     </PopoverContent>
                  </Popover>
               </div>

               <div title={city === '' ? 'Cidade é obrigatório' : ''}>
                  <Label data-locked={city === ''} className="data-[locked=true]:cursor-not-allowed data-[locked=true]:text-muted-foreground">
                     Bairro <i title="Obrigatório" className="ti ti-asterisk cursor-help text-primary text-xs/none px-1" />
                  </Label>

                  <Input disabled={city === ''} onChange={({ target }) => setNeighborhood(target.value)} className="peer mt-1" type="text" />
               </div>

               <div>
                  <Label>CEP</Label>
                  <Input onChange={({ target }) => setPostalCode(target.value)} type="number" />
               </div>

               <p className="col-span-full text-sm">Obrigatório <i title="Obrigatório" className="ti ti-asterisk cursor-help text-primary text-xs/none px-1"></i></p>
            </div>

            <DialogFooter>
               <Button onClick={submitClient}>Adicionar cliente</Button>
            </DialogFooter>
         </DialogContent>
      </Dialog>
   )
}