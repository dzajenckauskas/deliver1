import { CountriesResponseType } from '@/COMPONENTS/types/CountryType';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import { UseFormReturn } from 'react-hook-form';
import DeliveryDateForm from '../DeliveryDateForm';
import { OfferFormType } from '../OfferNewPage';
import OfferSummary from '../OfferSummary';
import PersonalInformationForm from '../PersonalInformationForm';
import ErrorMessage from './ErrorMessage';

type Props = {
    countriesData?: CountriesResponseType;
    form: UseFormReturn<OfferFormType, any, undefined>;
    nextStep: () => Promise<void>;
    activeStep: number;
    error: string;
    validateForm?: () => Promise<boolean>
}

const DetailsAndDatesStep = ({ validateForm, error, form, nextStep, countriesData, activeStep }: Props) => {
    const hasErrors = Object.keys(form.formState.errors).length > 0;

    return (
        <Card sx={{ p: 4, pb: 0, width: "100%", mx: "auto", mb: 10 }}>
            <Stack direction={{ xs: "column", md: "row" }} gap={{ xs: 0, md: 6 }} width={'100%'}>
                <Stack direction="column" gap={2} pb={2} width={'100%'} maxWidth={{ xs: '100%', md: "70%" }}>
                    <Typography variant="h2" sx={{ fontWeight: 500 }}>Your <b>Personal</b> Details</Typography>
                    <PersonalInformationForm form={form} errors={form.formState.errors} />
                    <Stack direction={'row'} justifyContent={'flex-start'}>
                        <DeliveryDateForm form={form} />
                    </Stack>
                    <Box pb={4} pt={2}>
                        <Button onClick={nextStep} variant="contained" color="secondary"
                            sx={{ px: 6, py: 2 }}>
                            Next step
                        </Button>
                        {hasErrors && <ErrorMessage message={'Check form for errors'} />}

                    </Box>
                </Stack>
                <Stack sx={{ maxWidth: { xs: "100%", md: '30%' }, width: '100%', position: 'relative' }}>
                    <OfferSummary validateForm={validateForm} countriesData={countriesData} activeStep={activeStep} form={form} />
                    <Stack direction={'row'}
                        sx={{
                            position: 'relative', mt: 2,
                            bottom: -46,
                            // minHeight: 300,
                            right: { xs: -50, md: 130 },
                            // width: '100%'
                        }}>
                        <Stack sx={{
                            // position: 'absolute', mt: 2, bottom: -24,
                            // right: 0,
                            //  right: { xs: -210, md: 135 },
                            // width: '100%'
                        }}>
                            <Image
                                alt="background"
                                // src={"/illustration-2.svg"}
                                src={"/deliveri-2-1.png"}
                                width={600}
                                height={320}
                                style={{
                                    objectFit: "contain"

                                }}
                            />
                        </Stack>
                    </Stack>
                </Stack>
            </Stack>
        </Card>
    )
}

export default DetailsAndDatesStep
