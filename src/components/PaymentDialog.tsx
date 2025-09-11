import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useForm } from 'react-hook-form';

interface PaymentDialogProps {
    isOpen: boolean;
    onClose: () => void;
    total: number;
    clearCart: () => void;
}

type FormData = {
    name: string;
    email: string;
    cardNumber: string;
    expiry: string;
    cvc: string;
    acceptTerms: boolean;
};

export default function PaymentDialog({ isOpen, onClose, total, clearCart }: PaymentDialogProps) {
    const [step, setStep] = useState(1);
    const [isProcessing, setIsProcessing] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

    const nextStep = () => setStep(prev => Math.min(prev + 1, 3));
    const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

    const onSubmit = () => nextStep();

    const simulatePayment = () => {
        setIsProcessing(true);
        setTimeout(() => {
            setIsProcessing(false);
            clearCart();
            nextStep();
        }, 2000);
    };

    const stepProgress = (s: number) => s <= step ? 'bg-black' : 'bg-gray-300';

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={onClose}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-25" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left shadow-xl transition-all font-manrope">
                                <Dialog.Title className="text-2xl font-semibold text-gray-900 mb-6">
                                    Pago en línea
                                </Dialog.Title>

                                <div className="flex items-center mb-6">
                                    {[1, 2, 3].map((s, idx) => (
                                        <Fragment key={s}>
                                            <div className={`w-10 h-10 flex items-center justify-center rounded-full text-white font-bold transition-colors duration-500 ${stepProgress(s)}`}>
                                                {s}
                                            </div>
                                            {idx < 2 && (
                                                <div className="flex-1 h-1 mx-2 bg-gray-300 rounded transition-all duration-500">
                                                    <div className={`h-1 rounded ${s < step ? 'bg-black w-full' : 'w-0'}`}></div>
                                                </div>
                                            )}
                                        </Fragment>
                                    ))}
                                </div>

                                <div className="max-h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 p-2">
                                    {step === 1 && (
                                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                                            <input
                                                type="text"
                                                placeholder="Nombre completo"
                                                {...register('name', { required: true })}
                                                className="w-full p-3 border border-gray-400 rounded-lg focus:outline-none"
                                            />
                                            {errors.name && <p className="text-red-500 text-sm">Nombre es obligatorio</p>}

                                            <input
                                                type="email"
                                                placeholder="Email"
                                                {...register('email', { required: true })}
                                                className="w-full p-3 border border-gray-400 rounded-lg focus:outline-none"
                                            />
                                            {errors.email && <p className="text-red-500 text-sm">Email es obligatorio</p>}

                                            <input
                                                type="text"
                                                placeholder="Número de tarjeta"
                                                {...register('cardNumber', { required: true, minLength: 16, maxLength: 16 })}
                                                maxLength={16}
                                                onChange={(e) => e.target.value = e.target.value.replace(/\D/g, '').slice(0, 16)}
                                                className="w-full p-3 border border-gray-400 rounded-lg focus:outline-none"
                                            />
                                            {errors.cardNumber && <p className="text-red-500 text-sm">Tarjeta inválida</p>}

                                            <div className="flex space-x-4">
                                                <input
                                                    type="text"
                                                    placeholder="MM/AA"
                                                    {...register('expiry', { required: true })}
                                                    maxLength={5}
                                                    onChange={(e) => {
                                                        let value = e.target.value.replace(/\D/g, '');
                                                        if (value.length >= 3) value = value.slice(0, 2) + '/' + value.slice(2, 4);
                                                        e.target.value = value;
                                                    }}
                                                    className="flex-1 p-3 border border-gray-400 rounded-lg focus:outline-none"
                                                />
                                                <input
                                                    type="text"
                                                    placeholder="CVC"
                                                    {...register('cvc', { required: true, minLength: 3, maxLength: 3 })}
                                                    maxLength={3}
                                                    onChange={(e) => e.target.value = e.target.value.replace(/\D/g, '').slice(0, 3)}
                                                    className="w-20 p-3 border border-gray-400 rounded-lg focus:outline-none"
                                                />
                                            </div>
                                            {(errors.expiry || errors.cvc) && <p className="text-red-500 text-sm">Campos inválidos</p>}

                                            <label className="flex items-center space-x-2">
                                                <input type="checkbox" {...register('acceptTerms', { required: true })} className="accent-black" />
                                                <span>Acepto términos y condiciones</span>
                                            </label>
                                            {errors.acceptTerms && <p className="text-red-500 text-sm">Debes aceptar los términos</p>}

                                            <button
                                                type="submit"
                                                className="w-full bg-black hover:bg-gray-900 text-white font-semibold py-3 rounded-lg transition-colors"
                                            >
                                                Siguiente
                                            </button>
                                        </form>
                                    )}

                                    {step === 2 && (
                                        <div className="flex flex-col justify-center items-center space-y-6 h-full">
                                            <p className="text-lg text-center">Confirma tu compra por un total de: <strong>${total.toFixed(2)}</strong></p>
                                            <div className="flex space-x-4 w-full px-2">
                                                <button
                                                    onClick={prevStep}
                                                    className="w-1/2 px-6 py-3 border border-black rounded-lg hover:bg-gray-100 transition-colors"
                                                >
                                                    Atrás
                                                </button>
                                                <button
                                                    onClick={simulatePayment}
                                                    className="w-1/2 px-6 py-3 bg-black hover:bg-gray-900 text-white rounded-lg transition-colors"
                                                >
                                                    {isProcessing ? 'Procesando...' : 'Pagar'}
                                                </button>
                                            </div>
                                        </div>
                                    )}

                                    {step === 3 && (
                                        <div className="flex flex-col justify-center items-center space-y-6 h-full">
                                            <p className="text-lg font-semibold text-black text-center">¡Pago completado con éxito!</p>
                                            <button
                                                onClick={onClose}
                                                className="w-1/2 px-6 py-3 bg-black hover:bg-gray-900 text-white rounded-lg transition-colors"
                                            >
                                                Cerrar
                                            </button>
                                        </div>
                                    )}
                                </div>

                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}
