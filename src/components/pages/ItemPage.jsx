import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';

export default function ItemPage() {
    const { itemId } = useParams();
    const navigate = useNavigate();
    
    // Initial state with empty values
    const [item, setItem] = useState({
        id: '',
        name: '',
        description: '',
        price: '',
        category: '',
        image: ''
    });
    
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        getItemInfo();
    }, [itemId]); /* Re-fetch when itemId changes */ 

    async function getItemInfo() {
        setLoading(true);
        try {
            const response = await fetch(`https://djevelyn.helioho.st/menu/id/${itemId}`);
            
            if (!response.ok) {
                throw new Error('Failed to fetch item details');
            }
            
            const data = await response.json();
            setItem(data);
            setError(null);
        } catch (err) {
            console.error('Error fetching item:', err);
            setError('Could not load item details. Please try again later.');
        } finally {
            setLoading(false);
        }
    }

    function handleGoBack() {
        navigate(-1); // Go back to previous page
    }

    // Function to handle adding the item to the cart
    const handleAddToOrder = () => {
        // Retrieve the current cart from localStorage
        const cart = JSON.parse(localStorage.getItem('cart')) || {};

        // Check if the item already exists in the cart
        if (cart[item.id]) {
            // If it exists, increment the quantity
            cart[item.id] += 1;
        } else {
            // If it doesn't exist, add it to the cart with a quantity of 1
            cart[item.id] = 1;
        }

        // Save the updated cart back to localStorage
        localStorage.setItem('cart', JSON.stringify(cart));

        // Optional: Notify the user that the item has been added
        alert(`${item.name} has been added to your order!`);
    };

    // Loading state
    if (loading) {
        return (
            <LoadingContainer>
                <LoadingText>Loading item details...</LoadingText>
            </LoadingContainer>
        );
    }

    // Error state
    if (error) {
        return (
            <ErrorContainer>
                <ErrorMessage>{error}</ErrorMessage>
                <BackButton onClick={handleGoBack}>
                    Go Back
                </BackButton>
            </ErrorContainer>
        );
    }

    // Format price as currency
    const formattedPrice = typeof item.price === 'number' 
        ? `£${item.price.toFixed(2)}` 
        : item.price;

    return (
        <PageContainer>
            <ItemCard>
                <HeaderBar>
                    <BackLink onClick={handleGoBack}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10 19l-7-7m0 0l7-7m-7 7h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        Back to Menu
                    </BackLink>
                </HeaderBar>
                
                <ContentContainer>
                    <ImageContainer>
                        {item.image ? (
                            <ItemImage src={item.image} alt={item.name} />
                        ) : (
                            <NoImagePlaceholder>
                                <span>No image available</span>
                            </NoImagePlaceholder>
                        )}
                    </ImageContainer>
                    
                    <DetailsContainer>
                        <CategoryBadge>
                            {item.category || 'Uncategorized'}
                        </CategoryBadge>
                        
                        <ItemName>{item.name}</ItemName>
                        
                        <ItemPrice>
                            {formattedPrice}
                        </ItemPrice>
                        
                        <DescriptionSection>
                            <SectionTitle>Description</SectionTitle>
                            <DescriptionText>
                                {item.description || 'No description available.'}
                            </DescriptionText>
                        </DescriptionSection>
                        
                        <ActionButtons>
                            <AddToOrderButton onClick={handleAddToOrder}>
                                Add to Order
                            </AddToOrderButton>
                            <FavoriteButton>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </FavoriteButton>
                        </ActionButtons>
                        
                        <ItemId>
                            Item ID: {item.id}
                        </ItemId>
                    </DetailsContainer>
                </ContentContainer>
            </ItemCard>
        </PageContainer>
    );
}

/* Styled Components */
const PageContainer = styled.div`
    min-height: 100vh;
    padding: 80px 20px 40px;
    background-color: #F2F9F9;
`;

const ItemCard = styled.div`
    max-width: 900px;
    margin: 0 auto;
    background-color: white;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const HeaderBar = styled.div`
    padding: 16px;
    background-color: #DCE9E9;
`;

const BackLink = styled.button`
    display: flex;
    align-items: center;
    background: none;
    border: none;
    color: #73A19E;
    font-size: 16px;
    cursor: pointer;
    padding: 0;
    transition: color 0.2s;

    &:hover {
        color: #80AAA4;
    }

    svg {
        margin-right: 8px;
    }
`;

const ContentContainer = styled.div`
    display: flex;
    flex-direction: column;

    @media (min-width: 768px) {
        flex-direction: row;
    }
`;

const ImageContainer = styled.div`
    width: 100%;
    height: 250px; /* Smaller image height */

    @media (min-width: 768px) {
        width: 40%; /* Smaller image width */
    }
`;

const ItemImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

const NoImagePlaceholder = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #DCE9E9;
    color: #73A19E;
`;

const DetailsContainer = styled.div`
    padding: 24px;
    flex: 1;
`;

const CategoryBadge = styled.div`
    display: inline-block;
    padding: 4px 12px;
    margin-bottom: 16px;
    font-size: 14px;
    background-color: #ACCEB2;
    color: #73A19E;
    border-radius: 20px;
`;

const ItemName = styled.h1`
    font-size: 28px;
    font-weight: bold;
    color: #73A19E;
    margin-bottom: 8px;
`;

const ItemPrice = styled.div`
    font-size: 24px;
    font-weight: bold;
    color: #80AAA4;
    margin-bottom: 24px;
`;

const DescriptionSection = styled.div`
    padding: 24px 0;
    border-top: 1px solid #DCE9E9;
    border-bottom: 1px solid #DCE9E9;
    margin-bottom: 24px;
`;

const SectionTitle = styled.h2`
    font-size: 18px;
    font-weight: 600;
    color: #73A19E;
    margin-bottom: 8px;
`;

const DescriptionText = styled.p`
    color: #4A4A4A;
    line-height: 1.6;
`;

const ActionButtons = styled.div`
    display: flex;
    gap: 16px;
`;

const AddToOrderButton = styled.button`
    flex: 1;
    padding: 12px 16px;
    background-color: #73A19E;
    color: white;
    border: none;
    border-radius: 6px;
    font-size: 16px;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover {
        background-color: #80AAA4;
    }
`;

const FavoriteButton = styled.button`
    width: 48px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #8EB4AA;
    border-radius: 6px;
    background: none;
    color: #73A19E;
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover {
        background-color: #DCE9E9;
    }
`;

const ItemId = styled.div`
    margin-top: 24px;
    font-size: 12px;
    color: #9E9E9E;
`;

const LoadingContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background-color: #F2F9F9;
`;

const LoadingText = styled.div`
    color: #73A19E;
    font-size: 20px;
    animation: pulse 1.5s infinite;

    @keyframes pulse {
        0% { opacity: 0.6; }
        50% { opacity: 1; }
        100% { opacity: 0.6; }
    }
`;

const ErrorContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    padding: 16px;
    background-color: #F2F9F9;
`;

const ErrorMessage = styled.div`
    color: #E53935;
    margin-bottom: 16px;
`;

const BackButton = styled.button`
    padding: 8px 16px;
    background-color: #73A19E;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover {
        background-color: #80AAA4;
    }
`;